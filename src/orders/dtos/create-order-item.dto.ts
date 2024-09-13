import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsPositive()
  price: number;
}
