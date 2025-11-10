import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FindAllBrandDto {
  @IsString()
  @IsOptional()
  limit: string;
  @IsString()
  @IsOptional()
  page: string;
}
