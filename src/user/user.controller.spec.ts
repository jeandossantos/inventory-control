import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from './types/dtos/createUserDto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserData } from './types/user.interface';
import { hashPassword } from '../utils/hashPassword';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const prisma = new PrismaService();

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const userMock: CreateUserDto = {
    name: 'john doe',
    email: 'john.doe@example.com',
    password: 'password',
    confirmedPassword: 'password',
    isAdmin: false,
  };

  async function createUser(user: CreateUserData) {
    const { name, email, password, isAdmin } = user;
    const prisma = new PrismaService();

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

  describe('/users (POST)', () => {
    test('should return 400 if passwords does not match!', async () => {
      let response = await request(app.getHttpServer())
        .post('/users')
        .send({ ...userMock, confirmedPassword: 'password-not-match' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Passwords does not match!');
    });

    test('should create a user successfully or return 400 if already exists ', async () => {
      let response = await request(app.getHttpServer())
        .post('/users')
        .send(userMock);

      expect(response.statusCode).toBe(201);
      expect(response.text).toBe('');

      response = await request(app.getHttpServer())
        .post('/users')
        .send(userMock);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User already exists!');
    });
  });

  describe('/users/:id (PUT)', () => {
    test('should return 400 if user does not exists!', async () => {
      let response = await request(app.getHttpServer())
        .put(`/users/7d5c68f8-7d09-4e12-83f5-3b5e7c5d5d5f`)
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
        .send({ email: 'updated-user@example.com', name: 'updated name' });

      expect(response.statusCode).toBe(200);
    });
  });
});
