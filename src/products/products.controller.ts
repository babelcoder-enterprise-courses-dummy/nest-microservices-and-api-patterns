import {
  BadRequestException,
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
import { faker } from '@faker-js/faker';
import { ProductsService } from './products.service';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductResponseDto } from './dtos/product-response.dto';
import { ProductListResponseDto } from './dtos/product-list-response.dto';
import { UniqueConstraintError } from 'src/core/errors/unique-constraint.error';
import { RecordNotFoundError } from 'src/core/errors/record-not-found.error';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products, GET /products?page=2&limit=20
  @Get()
  async findAll(@Query() query: FindAllQueryDto) {
    const itemsPaging = await this.productsService.findAll({
      page: query.page,
      limit: query.limit,
    });

    return new ProductListResponseDto(itemsPaging);
  }

  // GET /products/:id
  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    const product = await this.productsService.findByIdOrSlug(idOrSlug);

    if (!product) throw new NotFoundException();

    return new ProductResponseDto(product);
  }

  // POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() form: CreateProductDto) {
    try {
      const product = await this.productsService.create(
        form,
        faker.image.url(),
      );

      return new ProductResponseDto(product);
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException(e.message);
      }
    }
  }

  // PATCH /products/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() form: UpdateProductDto,
  ) {
    try {
      const product = await this.productsService.update(
        id,
        form,
        faker.image.url(),
      );

      return new ProductResponseDto(product);
    } catch (e) {
      if (e instanceof RecordNotFoundError) throw new NotFoundException();
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException(e.message);
      }
    }
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productsService.destroy(id);
    } catch (e) {
      if (e instanceof RecordNotFoundError) throw new NotFoundException();
    }
  }
}
