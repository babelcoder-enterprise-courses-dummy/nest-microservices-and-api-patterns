import { Order, OrderItem } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class OrderResponseDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.items.length)
  count: number;

  @Expose()
  @Transform(({ obj }) => OrderResponseDto.getTotalPrice(obj.items))
  totalPrice: number;

  @Expose()
  createdAt: Date;

  constructor(order: Order) {
    Object.assign(this, order);
  }

  static getTotalPrice(items: OrderItem[]) {
    let totalPrice = 0;

    for (const item of items) {
      totalPrice += item.price * item.quantity;
    }

    return totalPrice;
  }
}
