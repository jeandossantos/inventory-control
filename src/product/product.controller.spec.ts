import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

import { ProductService } from './product.service';
import { tokenGenerator } from '../utils/tokenGenerator';
import { CreateProductDto } from './types/dtos/productDto';
import { PrismaService } from '../prisma/prisma.service';

import { createProduct, createUser } from '../utils/test-utils';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let loggedUser: any;
  let authToken: string;
  let productMock: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prismaService.movement.deleteMany();
    await prismaService.product.deleteMany();
    await prismaService.user.deleteMany();
    await prismaService.$disconnect();
  });

  const userMock = {
    name: 'john doe',
    email: 'product.controller@example.com',
    password: 'password',
    isAdmin: false,
  };

  beforeAll(async () => {
    authToken = await tokenGenerator(userMock);
  });

  describe('/products (POST)', () => {
    productMock = {
      name: 'Product',
      description: 'Product description',
      quantity: 50,
      minStock: 5,
      price: '10.50',
    };

    test('should return 401 if user is not logged in', async () => {
      loggedUser = await createUser(prismaService, userMock);

      const response = await request(app.getHttpServer())
        .post('/products')
        .send({ ...productMock, userId: loggedUser.id });

      expect(response.status).toBe(401);
    });

    test('should return 201', async () => {
      createProduct(prismaService, productMock);

      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', authToken)
        .send({ ...productMock, userId: loggedUser.id });

      expect(response.status).toBe(201);
    });
  });

  describe('/products (PUT)', () => {
    test('should return 401 if user is not logged in', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send({ ...productMock, userId: loggedUser.id });

      expect(response.status).toBe(401);
    });
    test.todo('should return 200');
  });

  describe('/products (GET)', () => {
    test.todo('should return 401 if user is not logged in');
    test.todo('should return 200');
  });

  describe('/products/in (PATCH)', () => {
    test.todo('should return 401 if user is not logged in');
    test.todo('should return 200');
  });

  describe('/products/out (PATCH)', () => {
    test.todo('should return 401 if user is not logged in');
    test.todo('should return 200');
  });
});
