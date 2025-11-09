import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory';
import { Auth, MESSAGE, Public, User } from '@/common';

@Controller('brand')
@Auth('Admin')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactoryService: BrandFactoryService,
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactoryService.createBrand(createBrandDto, user);
    const createdBrand = await this.brandService.create(brand);
    return {
      message: MESSAGE.brand.created,
      success: true,
      data: { brand: createdBrand },
    };
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return {
      message: MESSAGE.brand.found,
      success: true,
      data: { brand },
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
