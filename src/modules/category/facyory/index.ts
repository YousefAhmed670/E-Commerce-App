import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
@Injectable()
export class CategoryFactoryService {
  createCategory(createCategoryDto: CreateCategoryDto, user: any): Category {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.logo = createCategoryDto.logo;
    return category;
  }
  updateCategory(updateCategoryDto: UpdateCategoryDto, user: any): Category {
    const category = new Category();
    category.name = updateCategoryDto.name || category.name;
    category.logo = updateCategoryDto.logo || category.logo;
    category.updatedBy = user._id;
    return category;
  }
}
