import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { createProduct, createUser } from '../utils/test-utils';
import { tokenGenerator } from '../utils/tokenGenerator';

describe('MovementsController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let loggedUser;
  let authToken: string;

  const productMock = {
    name: 'Product',
    description: 'Product description',
    quantity: 50,
    minStock: 5,
    price: '10.50',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();

    loggedUser = await createUser(prismaService, {
      name: 'movement da silva',
      email: 'moviment.controller@example.com',
      password: 'password',
      isAdmin: true,
    });

    for (let i = 10; i <= 10; i++) {
      await createProduct(prismaService, {
        ...productMock,
        name: 'Product number ' + i,
        description: 'Product description ' + i,
        userId: loggedUser.id,
      });
    }

    authToken = await tokenGenerator(loggedUser);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('GET /movements', () => {
    it('should return 401 if not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .get('/movements')
        .query({
          from: new Date('2022-02-01'),
          to: new Date('2022-01-01'),
          page: 1,
          search: '',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return all movements', async () => {
      const response = await request(app.getHttpServer())
        .get('/movements')
        .query({
          from: '',
          to: '',
          page: 1,
          search: '',
        })
        .set('Authorization', authToken);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('limit');
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return movements filtered by date range', async () => {
      const from = new Date();
      const to = new Date();
      from.setDate(from.getDate() - 1);
      to.setDate(to.getDate() + 1);

      const response = await request(app.getHttpServer())
        .get(`/movements`)
        .query({
          from,
          to,
          page: 1,
          search: '',
        })
        .set('Authorization', authToken)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('limit');
      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((movement) => {
        expect(new Date(movement.moment).getTime()).toBeGreaterThanOrEqual(
          new Date(from).getTime(),
        );
        expect(new Date(movement.moment).getTime()).toBeLessThanOrEqual(
          new Date(to).getTime(),
        );
      });
    });

    it('should return 400 if "from" date is greater than "to" date', async () => {
      const from = new Date('2022-02-01');
      const to = new Date('2022-01-01');

      const response = await request(app.getHttpServer())
        .get(`/movements`)
        .query({
          from,
          to,
          page: 1,
          search: '',
        })
        .set('Authorization', authToken)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(
        'Invalid date range: "from" date cannot be greater than "to" date',
      );
    });
  });
});
