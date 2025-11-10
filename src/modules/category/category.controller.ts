import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './facyory';
import { Auth, MESSAGE, Public, User } from '@/common';
import { DeleteResult } from 'mongoose';

@Controller('category')
@Auth('Admin', 'Seller')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = this.categoryFactoryService.createCategory(
      createCategoryDto,
      user,
    );
    const createdCategory = await this.categoryService.create(category);
    return {
      message: MESSAGE.category.created,
      success: true,
      data: { category: createdCategory },
    };
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      message: MESSAGE.category.found,
      success: true,
      data: { category },
    };
  }

  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param() id: string): Promise<DeleteResult> {
    return this.categoryService.remove(id);
  }
}
