import { IsValidDiscount } from '@/common';
import { DiscountType } from '@/common/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  description: string;
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsValidDiscount()
  @IsOptional()
  discountAmount: number;
  @IsString()
  @IsEnum(DiscountType)
  @IsOptional()
  discountType: DiscountType;
  @IsNumber()
  @IsOptional()
  stock: number;
  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors: string[];
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes: string[];
}
