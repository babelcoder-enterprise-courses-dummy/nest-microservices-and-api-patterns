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

  @Transform(({ value }) => +value)
  @IsNumber()
  price: number;

  @Transform(({ value }) => (value as string[]).map((i) => +i))
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  categoryIds: number[];
}
