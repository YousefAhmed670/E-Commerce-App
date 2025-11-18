import { DiscountType } from '@/common/types';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

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
  updateProduct(updateProductDto: UpdateProductDto, user: any) {
    const product: Partial<Product> = {};
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.description)
      product.description = updateProductDto.description;
    if (updateProductDto.price) product.price = updateProductDto.price;
    if (updateProductDto.discountAmount !== undefined)
      product.discountAmount = updateProductDto.discountAmount;
    if (updateProductDto.discountType)
      product.discountType = updateProductDto.discountType;
    if (updateProductDto.stock !== undefined)
      product.stock = updateProductDto.stock;
    if (updateProductDto.categoryId)
      product.categoryId = new Types.ObjectId(updateProductDto.categoryId);
    if (updateProductDto.brandId)
      product.brandId = new Types.ObjectId(updateProductDto.brandId);
    if (updateProductDto.colors) product.colors = updateProductDto.colors;
    if (updateProductDto.sizes) product.sizes = updateProductDto.sizes;
    product.updatedBy = user._id;
    return product;
  }
}
