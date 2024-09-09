import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products, GET /products?page=2&limit=20
  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    return this.productsService.findAll(query);
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.findById(id);
    } catch {
      throw new NotFoundException();
    }
  }

  // POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() form: CreateProductDto) {
    return this.productsService.create(form);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() form: UpdateProductDto,
  ) {
    try {
      return this.productsService.update(id, form);
    } catch {
      throw new NotFoundException();
    }
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.productsService.remove(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
