import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from './types/dtos/createUserDto';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    const prisma = new PrismaService();

    await prisma.user.delete({
      where: {
        email: userMock.email,
      },
    });
  });

  const userMock: CreateUserDto = {
    name: 'john doe',
    email: 'john.doe@example.com',
    password: 'password',
    confirmedPassword: 'password',
    isAdmin: false,
  };

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userMock)
      .expect(201)
      .expect('');
  });
});
