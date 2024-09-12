import { Expose } from 'class-transformer';

export class PaginationMetaDto {
  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  previousPage?: number;

  @Expose()
  nextPage?: number;

  @Expose()
  totalCount: number;

  constructor(meta: PaginationMetaDto) {
    Object.assign(this, meta);
  }
}
