import { MESSAGE } from '@/common';
import { CategoryRepository } from '@/models';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Types } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });
    if (categoryExist) {
      throw new ConflictException(MESSAGE.category.alreadyExists);
    }
    const createdCategory = await this.categoryRepository.create(category);
    return createdCategory;
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: string | Types.ObjectId) {
    const category = this.categoryRepository.getOne(
      { _id: id },
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
    );
    if (!category) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(
      { _id: id },
      updateCategoryDto,
    );
  }

  remove(id: string): Promise<DeleteResult> {
    return this.categoryRepository.delete({ _id: id });
  }
}
