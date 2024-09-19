import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CacheModule } from '@nestjs/cache-manager';
import { mockDeep } from 'jest-mock-extended';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .useMocker(mockDeep)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('findById', () => {
    it('accurately returns a certain category', async () => {
      const category = {
        id: 1,
        name: 'Name#1',
        desc: 'Desc#1',
        slug: 'name-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindById = jest
        .spyOn(service, 'findById')
        .mockResolvedValueOnce(category);
      const result = await controller.findOne(1);

      expect(result).toEqual(new CategoryResponseDto(category));
      expect(mockFindById).toHaveBeenCalledWith(1);
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });

    it('throws an exception when the specified category is not found', async () => {
      const mockFindById = jest
        .spyOn(service, 'findById')
        .mockResolvedValueOnce(null);

      expect(() => controller.findOne(1)).rejects.toThrow(NotFoundException);
      expect(mockFindById).toHaveBeenCalledWith(1);
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });
  });
});
