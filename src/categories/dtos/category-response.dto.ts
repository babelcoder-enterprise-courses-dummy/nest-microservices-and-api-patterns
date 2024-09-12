import { Category } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  desc: string;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
