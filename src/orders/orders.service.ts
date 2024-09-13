import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }

  findById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
  }

  create(userId: number, form: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        items: { create: form.items },
        userId,
      },
      include: { items: true },
    });
  }
}
