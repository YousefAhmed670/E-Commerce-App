import { MESSAGE } from '@/common';
import { BrandRepository } from '@/models';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateBrandDto } from './dto/update-brand.dto';
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

  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: string | Types.ObjectId) {
    const brandExist = await this.brandRepository.getOne(
      { _id: id },
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
    );
    if (!brandExist) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    return brandExist;
  }

  update(id: string | Types.ObjectId, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
