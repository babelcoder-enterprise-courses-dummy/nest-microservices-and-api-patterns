import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { omit } from 'lodash';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeEach(async () => {
    await prisma.category.deleteMany();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        excludeExtraneousValues: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('/categories/:id (GET)', async () => {
    const category = await prisma.category.create({
      data: {
        name: 'Name',
        desc: 'Desc',
        slug: 'name',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/categories/${category.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(omit(category, ['updatedAt', 'createdAt']));
  });
});
