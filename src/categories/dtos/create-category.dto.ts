import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @IsString()
  @Length(10, 150)
  desc: string;
}
