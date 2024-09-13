import { OrderItem, Product } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/products/dtos/product-response.dto';

export class OrderItemDetailsResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ProductResponseDto)
  product: Product;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  constructor(orderItem: OrderItem) {
    Object.assign(this, orderItem);
  }
}
