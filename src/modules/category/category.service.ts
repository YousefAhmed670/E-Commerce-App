import { MESSAGE } from '@/common';
import { CategoryRepository } from '@/models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Types } from 'mongoose';
import {
  FindAllCategoryDto,
  UpdateCategoryDto,
} from './dto/update-category.dto';
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

  findAll(findAllCategoryDto: FindAllCategoryDto) {
    const { limit, page } = findAllCategoryDto;
    const skip = (+page - 1) * +limit;
    return this.categoryRepository.getAll(
      {},
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName email' },
          { path: 'updatedBy', select: 'userName email' },
        ],
        limit: +limit,
        skip,
      },
    );
  }

  findOne(id: string | Types.ObjectId) {
    const categoryExist = this.categoryRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName email' },
          { path: 'updatedBy', select: 'userName email' },
        ],
      },
    );
    if (!categoryExist) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return categoryExist;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    const updatedCategory = await this.categoryRepository.update(
      { _id: categoryExist._id },
      updateCategoryDto,
    );
    return updatedCategory;
  }

  async remove(id: string): Promise<DeleteResult> {
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return await this.categoryRepository.delete({ _id: id });
  }
}
