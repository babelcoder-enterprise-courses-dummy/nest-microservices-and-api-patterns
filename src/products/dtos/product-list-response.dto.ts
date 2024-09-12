import { Expose, Type } from 'class-transformer';
import { ProductResponseDto } from './product-response.dto';
import { PaginationMetaDto } from './pagination-meta.dto';

export class ProductListResponseDto {
  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Expose()
  @Type(() => ProductResponseDto)
  items: ProductResponseDto[];

  constructor(itemsPaging: ProductListResponseDto) {
    Object.assign(this, itemsPaging);
  }
}
