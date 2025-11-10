import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FindAllCategoryDto {
  @IsString()
  @IsOptional()
  limit: string;
  @IsString()
  @IsOptional()
  page: string;
}
