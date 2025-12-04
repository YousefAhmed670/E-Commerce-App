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

  async findAll(findAllCategoryDto: FindAllCategoryDto) {
    const { limit, page } = findAllCategoryDto;
    const skip = (+page - 1) * +limit;
    return await this.categoryRepository.getAll(
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

  async findOne(id: string | Types.ObjectId) {
    const categoryExist = await this.categoryRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'userName email' },
          { path: 'updatedBy', select: 'userName email' },
          { path: 'products' },
        ],
      },
    );
    if (!categoryExist) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return categoryExist;
  }

  async update(
    id: string | Types.ObjectId,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.findOne(id);
    const updatedCategory = await this.categoryRepository.update(
      { _id: id },
      updateCategoryDto,
    );
    return updatedCategory;
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.categoryRepository.delete({ _id: id });
  }
}
