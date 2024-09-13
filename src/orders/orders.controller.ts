import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Auth } from 'src/auth/guards/auth.guard';
import { OrdersService } from './orders.service';
import { OrderResponseDto } from './dtos/order-response.dto';
import { OrderDetailsResponseDto } from './dtos/order-details-response.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Auth()
  async findAll(@CurrentUser() user: User) {
    const orders = await this.ordersService.findAll(user.id);

    return orders.map((o) => new OrderResponseDto(o));
  }

  @Get(':id')
  @Auth()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const order = await this.ordersService.findById(id);

    if (!order) throw new NotFoundException();

    if (order.userId !== user.id) {
      throw new ForbiddenException();
    }

    return new OrderDetailsResponseDto(order);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  async create(@CurrentUser() user: User, @Body() form: CreateOrderDto) {
    const order = await this.ordersService.create(user.id, form);

    return new OrderResponseDto(order);
  }
}
