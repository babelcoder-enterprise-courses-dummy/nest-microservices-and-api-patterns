import { Expose } from 'class-transformer';
import { Product } from '../product.model';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  price: number;

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
  }
}
