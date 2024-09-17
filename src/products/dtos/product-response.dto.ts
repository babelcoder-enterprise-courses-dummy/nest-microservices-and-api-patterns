import { ApiProperty } from '@nestjs/swagger';
import { Category, Product } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

import { CategoryResponseDto } from 'src/categories/dtos/category-response.dto';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  desc: string;

  @Expose()
  price: number;

  @Expose()
  image: string;

  @Expose()
  @Type(() => CategoryResponseDto)
  @ApiProperty({ type: [CategoryResponseDto] })
  categories: Category[];

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
  }
}