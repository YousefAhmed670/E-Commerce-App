import { MESSAGE } from '@/common';
import { BrandRepository } from '@/models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Types } from 'mongoose';
import { FindAllBrandDto, UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async create(brand: Brand) {
    const brandExist = await this.brandRepository.getOne({ slug: brand.slug });
    if (brandExist) {
      throw new ConflictException(MESSAGE.brand.alreadyExists);
    }
    const createdBrand = await this.brandRepository.create(brand);
    return createdBrand;
  }

  async findAll(findAllBrandDto: FindAllBrandDto) {
    const { limit, page } = findAllBrandDto;
    const skip = (+page - 1) * +limit;
    return await this.brandRepository.getAll(
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
    const brandExist = await this.brandRepository.getOne(
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
    if (!brandExist) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    return brandExist;
  }

  async update(id: string | Types.ObjectId, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);
    const updatedBrand = await this.brandRepository.update(
      { _id: id },
      updateBrandDto,
    );
    return updatedBrand;
  }

  async remove(id: string | Types.ObjectId): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.brandRepository.delete({ _id: id });
  }
}
