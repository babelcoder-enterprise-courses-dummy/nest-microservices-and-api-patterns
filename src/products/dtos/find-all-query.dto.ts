import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllQueryDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  limit?: number;
}
