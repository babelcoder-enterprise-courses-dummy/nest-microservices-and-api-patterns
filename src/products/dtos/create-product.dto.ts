import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @IsString()
  @Length(10, 150)
  desc: string;

  @IsNumber()
  @Transform(({ value }) => +value)
  price: number;

  @Transform(({ value }) => {
    const ids = Array.isArray(value) ? value : (value as string).split(',');
    return ids.map((i) => +i);
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  categoryIds: number[];
}