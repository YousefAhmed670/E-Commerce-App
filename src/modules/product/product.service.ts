import { MESSAGE } from '@/common';
import { ProductRepository } from '@/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Types } from 'mongoose';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { FindAllProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import slugify from 'slugify';
@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product, user: any) {
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId);
    const productExist = await this.productRepository.getOne({
      slug: product.slug,
      $or: [{ createdBy: user._id }, { updatedBy: user._id }],
    });
    if (productExist) {
      return await this.update(productExist._id, product);
    }
    return await this.productRepository.create(product);
  }

  async findAll(findAllProductDto: FindAllProductDto) {
    const { limit, page } = findAllProductDto;
    const skip = (+page - 1) * +limit;
    return await this.productRepository.getAll(
      {},
      {},
      {
        populate: [
          { path: 'categoryId', select: 'name slug' },
          { path: 'brandId', select: 'name slug' },
          { path: 'createdBy', select: 'userName email' },
          { path: 'updatedBy', select: 'userName email' },
        ],
        limit: +limit,
        skip,
      },
    );
  }

  async findOne(id: string | Types.ObjectId) {
    const productExist = await this.productRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'categoryId', select: 'name slug' },
          { path: 'brandId', select: 'name slug' },
          { path: 'createdBy', select: 'userName email' },
          { path: 'updatedBy', select: 'userName email' },
        ],
      },
    );
    if (!productExist) {
      throw new NotFoundException(MESSAGE.product.notFound);
    }
    return productExist;
  }

  async update(id: string | Types.ObjectId, product: Partial<Product>) {
    const productExist = await this.findOne(id);
    if (product.categoryId) {
      await this.categoryService.findOne(product.categoryId);
    }
    if (product.brandId) {
      await this.brandService.findOne(product.brandId);
    }
    if (product.name && product.name !== productExist.name) {
      product.slug = slugify(product.name, { lower: true });
    }
    if (product.colors && product.colors.length > 0) {
      product.colors = this.addToSet(productExist.colors, product.colors);
    } else {
      product.colors = productExist.colors;
    }
    if (product.sizes && product.sizes.length > 0) {
      product.sizes = this.addToSet(productExist.sizes, product.sizes);
    } else {
      product.sizes = productExist.sizes;
    }
    if (product.stock !== undefined && product.stock > 0) {
      product.stock += productExist.stock;
    } else {
      product.stock = productExist.stock;
    }
    const updatedProduct = await this.productRepository.update(
      { _id: id },
      product,
    );
    return updatedProduct;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.productRepository.delete({ _id: id });
  }

  addToSet(oldData: string[], newData: string[]) {
    const set = new Set<string>(oldData);
    for (const item of newData) {
      set.add(item);
    }
    return Array.from(set);
  }
}
