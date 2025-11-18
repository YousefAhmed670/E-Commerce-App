import { Auth, MESSAGE, Public, User } from '@/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FindAllProductDto, UpdateProductDto } from './dto/update-product.dto';
import { ProductFactoryService } from './factory';
import { ProductService } from './product.service';

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
    const createdProduct = await this.productService.create(product, user);
    return {
      message: MESSAGE.product.created,
      success: true,
      data: { product: createdProduct },
    };
  }

  @Get()
  @Public()
  async findAll(@Query() findAllProductDto: FindAllProductDto) {
    const products = await this.productService.findAll(findAllProductDto);
    return {
      message: MESSAGE.product.found,
      success: true,
      data: { products },
    };
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: any,
  ) {
    const product = this.productFactoryService.updateProduct(
      updateProductDto,
      user,
    );
    const updatedProduct = await this.productService.update(id, product);
    return {
      message: MESSAGE.product.updated,
      success: true,
      data: { product: updatedProduct },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return {
      message: MESSAGE.product.deleted,
      success: true,
    };
  }
}
