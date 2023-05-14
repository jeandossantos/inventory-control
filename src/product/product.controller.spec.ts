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
  let productToBeEdited;

  afterAll(async () => {
    await prismaService.movement.deleteMany();
    await prismaService.product.deleteMany();
    await prismaService.user.deleteMany({ where: { id: loggedUser.id } });
    await prismaService.$disconnect();
  });

  const userMock = {
    name: 'john doe',
    email: 'product.controller@example.com',
    password: 'password',
    isAdmin: false,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();

    authToken = await tokenGenerator(userMock);
    productToBeEdited = await createProduct(prismaService, productMock);
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
        .put(`/products/${productToBeEdited.id}`)
        .send(productToBeEdited);

      expect(response.status).toBe(401);
    });

    test('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .put(`/products/${productToBeEdited.id}`)
        .set('Authorization', authToken)
        .send(productToBeEdited);

      expect(response.status).toBe(200);
    });
  });

  describe('/products (GET)', () => {
    test('should return 401 if user is not logged in', async () => {
      const response = await request(app.getHttpServer()).get(`/products`);

      expect(response.status).toBe(401);
    });

    test('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .get(`/products?page=1&search='Product'`)
        .set('Authorization', authToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('/products/in/:id (PATCH)', () => {
    test('should return 401 if user is not logged in', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/in/${productToBeEdited.id}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(401);
    });

    test('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/in/${productToBeEdited.id}`)
        .set('Authorization', authToken)
        .send({ quantity: 50 });

      expect(response.status).toBe(200);

      const { currentQuantity } = await prismaService.product.findUnique({
        where: { id: productToBeEdited.id },
      });

      expect(currentQuantity).toBe(100);
    });
  });

  describe('/products/out/:id  (PATCH)', () => {
    test('should return 401 if user is not logged in', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/out/${productToBeEdited.id}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(401);
    });

    test('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/out/${productToBeEdited.id}`)
        .set('Authorization', authToken)
        .send({ quantity: 20 });

      expect(response.status).toBe(200);

      const { currentQuantity } = await prismaService.product.findUnique({
        where: { id: productToBeEdited.id },
      });

      expect(currentQuantity).toBe(80);
    });
  });
});
