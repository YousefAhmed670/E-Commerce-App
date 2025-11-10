import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, MESSAGE, Public, User } from '@/common';
import { ProductFactoryService } from './factory';
import { DeleteResult } from 'mongoose';

@Controller('product')
@Auth('Admin', 'Seller')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactoryService.createProduct(
      createProductDto,
      user,
    );
    const createdProduct = await this.productService.create(product);
    return {
      message: MESSAGE.product.created,
      success: true,
      data: { product: createdProduct },
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return {
      message: MESSAGE.product.found,
      success: true,
      data: { product },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: any,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    return {
      message: MESSAGE.product.updated,
      success: true,
      data: { product: updatedProduct },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.remove(id);
  }
}
