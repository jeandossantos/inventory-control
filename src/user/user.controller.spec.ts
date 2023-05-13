import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from './types/dtos/createUserDto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserData } from './types/user.interface';
import { hashPassword } from '../utils/hashPassword';
import { tokenGenerator } from '../utils/tokenGenerator';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authToken: string;
  let userMock: CreateUserDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await prismaService.$disconnect();
  });

  userMock = {
    name: 'john doe',
    email: 'john.doe@example.com',
    password: 'password',
    confirmedPassword: 'password',
    isAdmin: true,
  };

  beforeAll(async () => {
    authToken = await tokenGenerator(userMock);
  });

  async function createUser(user: CreateUserData) {
    const { name, email, password, isAdmin } = user;
    const prisma = prismaService;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        isAdmin,
        password: await hashPassword(password),
      },
    });

    await prisma.$disconnect();

    return newUser;
  }

  async function getUserById(id: string) {
    const prisma = prismaService;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    await prisma.$disconnect();

    return user;
  }

  describe('/users (POST)', () => {
    test('should return 400 if passwords does not match!', async () => {
      let response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', authToken)
        .send({ ...userMock, confirmedPassword: 'password-not-match' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Passwords does not match!');
    });

    test('should create a user successfully or return 400 if already exists ', async () => {
      let response = await request(app.getHttpServer())
        .post('/users')
        .send(userMock)
        .set('Authorization', authToken);
      expect(response.statusCode).toBe(201);
      expect(response.text).toBe('');

      response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', authToken)
        .send(userMock);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User already exists!');
    });
  });

  describe('/users/:id (PUT)', () => {
    test('should return 400 if user does not exists!', async () => {
      let response = await request(app.getHttpServer())
        .put(`/users/7d5c68f8-7d09-4e12-83f5-3b5e7c5d5d5f`)
        .set('Authorization', authToken)
        .send({ ...userMock, email: 'email-does-not-exists@email.com' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User not found!');
    });

    test('should update a user!', async () => {
      const { email, name } = userMock;

      const { id } = await createUser({
        ...userMock,
        email: 'user-to-be-updated@example.com',
      });

      let response = await request(app.getHttpServer())
        .put(`/users/${id}`)
        .set('Authorization', authToken)
        .send({ email: 'updated-user@example.com', name: 'updated name' });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user successfully', async () => {
      const userIdToDelete = await createUser({
        ...userMock,
        email: 'user-to-delete@example.com',
      });

      await request(app.getHttpServer())
        .delete(`/users/${userIdToDelete.id}`)
        .set('Authorization', authToken)
        .expect(200);

      const deletedUser = await getUserById(userIdToDelete.id);

      expect(deletedUser.deletedAt).toBeTruthy();
    });

    it('should return a 400 error if user not found', async () => {
      const userIdToDelete = '506a48f9-1c68-4d9a-a5c5-8f7b0c5f41e7';

      const res = await request(app.getHttpServer())
        .delete(`/users/${userIdToDelete}`)
        .set('Authorization', authToken)
        .expect(400);

      expect(res.body.message).toEqual('User not found!');
    });
  });

  describe('/users (GET)', () => {
    test('should return all users', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users/?page=1&search=user`)
        .set('Authorization', authToken)
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      expect(res.body).toHaveProperty('limit');
    });
  });
});
