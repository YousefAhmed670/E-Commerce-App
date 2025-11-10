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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  FindAllCategoryDto,
  UpdateCategoryDto,
} from './dto/update-category.dto';
import { CategoryFactoryService } from './facyory';

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
  @Public()
  async findAll(@Query() findAllCategoryDto: FindAllCategoryDto) {
    const categories = await this.categoryService.findAll(findAllCategoryDto);
    return {
      message: MESSAGE.category.found,
      success: true,
      data: { categories },
    };
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: any,
  ) {
    const category = this.categoryFactoryService.updateCategory(
      updateCategoryDto,
      user,
    );
    const updatedCategory = await this.categoryService.update(id, category);
    return {
      message: MESSAGE.category.updated,
      success: true,
      data: { category: updatedCategory },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return {
      message: MESSAGE.category.deleted,
      success: true,
    };
  }
}
