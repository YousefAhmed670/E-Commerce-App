import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { Types } from 'mongoose';
import { DiscountType } from '@/models';

@Injectable()
export class ProductFactoryService {
  createProduct(createProductDto: CreateProductDto, user: any) {
    const product = new Product();
    product.name = createProductDto.name;
    product.slug = slugify(createProductDto.name, { lower: true });
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.discountAmount = createProductDto.discountAmount as number;
    product.discountType = createProductDto.discountType as DiscountType;
    product.stock = createProductDto.stock as number;
    product.sold = 0;
    product.categoryId = new Types.ObjectId(createProductDto.categoryId);
    product.brandId = new Types.ObjectId(createProductDto.brandId);
    product.createdBy = user._id;
    product.updatedBy = user._id;
    product.colors = createProductDto.colors as string[];
    product.sizes = createProductDto.sizes as string[];
    return product;
  }
}
