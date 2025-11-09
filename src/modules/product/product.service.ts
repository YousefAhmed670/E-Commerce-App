import { ProductRepository } from '@/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { Types } from 'mongoose';
import { MESSAGE } from '@/common';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product) {
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId);
    const createdProduct = await this.productRepository.create(product);
    return createdProduct;
  }

  findAll() {}

  async findOne(id: string | Types.ObjectId) {
      const productExist = await this.productRepository.getOne(
        { _id: id },
        {},
      {
        populate: [
          { path: 'categoryId' },
          { path: 'brandId' },
          { path: 'createdBy' },
          { path: 'updatedBy' },
        ],
      },
      );
      if (!productExist) {
        throw new NotFoundException(MESSAGE.product.notFound);
      }      
      return productExist;
    }

  async update(
    id: string | Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOne(id);

    // Validate categoryId and brandId if provided
    if (updateProductDto.categoryId) {
      await this.categoryService.findOne(updateProductDto.categoryId);
    }

    if (updateProductDto.brandId) {
      await this.brandService.findOne(updateProductDto.brandId);
    }
    const updatedProduct = await this.productRepository.update(
      { _id: id },
      updateProductDto,
    );
    return updatedProduct;
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
