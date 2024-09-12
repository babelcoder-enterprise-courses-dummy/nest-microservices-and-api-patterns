import { Category, Product } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/categories/dtos/category-response.dto';

type ProductInput = Product & { categories: Category[] };

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
  @Type(() => CategoryResponseDto)
  categories: Category[];

  constructor(product: Partial<ProductInput>) {
    Object.assign(this, product);
  }
}
