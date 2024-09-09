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
  price: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  categoryIds: number[];
}
