import { Injectable } from '@nestjs/common';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(options: FindAllQueryDto = {}) {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find((p) => p.id === id);

    if (!product) throw new Error('product not found');

    return product;
  }

  create(form: CreateProductDto) {
    const product = {
      ...form,
      id: this.products.length + 1,
    };

    this.products.push(product);

    return product;
  }

  update(id: number, form: UpdateProductDto) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) throw new Error('product not found');

    this.products[index] = {
      ...this.products[index],
      ...form,
    };

    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) throw new Error('product not found');

    this.products.splice(index, 1);
  }
}
