import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/core/services/prisma.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(
      PrismaService,
    ) as unknown as DeepMockProxy<PrismaClient>;
  });

  it('accurately returns a certain category', async () => {
    const category = {
      id: 1,
      name: 'Name#1',
      desc: 'Desc#1',
      slug: 'name-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockFindUnique =
      prisma.category.findUnique.mockResolvedValueOnce(category);
    const result = await service.findById(1);

    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toBe(category);
  });
});
