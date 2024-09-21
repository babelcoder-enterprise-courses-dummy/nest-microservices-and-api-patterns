import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Reflector } from '@nestjs/core';
import { omit } from 'lodash';
import { RedisStore } from 'cache-manager-redis-yet';
import { RedisClientType } from 'redis';
import { CacheOptions } from '@nestjs/cache-manager';
import { PrismaService } from 'src/core/services/prisma.service';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let redis: RedisClientType;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    redis = (
      moduleFixture.get<CacheOptions>('CACHE_MANAGER')
        .store as RedisStore<RedisClientType>
    ).client;
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        excludeExtraneousValues: true,
      }),
    );
    await app.init();
    await prisma.category.deleteMany();
  });

  afterEach(async () => {
    await prisma.$disconnect();
    await redis.disconnect();
    await app.close();
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
