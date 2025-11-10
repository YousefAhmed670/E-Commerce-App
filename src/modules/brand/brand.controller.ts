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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { FindAllBrandDto, UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory';

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
  @Public()
  async findAll(@Query() findAllBrandDto: FindAllBrandDto) {
    const brands = await this.brandService.findAll(findAllBrandDto);
    return {
      message: MESSAGE.brand.found,
      success: true,
      data: { brands },
    };
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @User() user: any,
  ) {
    const brand = this.brandFactoryService.updateBrand(updateBrandDto, user);
    const updatedBrand = await this.brandService.update(id, brand);
    return {
      message: MESSAGE.brand.updated,
      success: true,
      data: { brand: updatedBrand },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.brandService.remove(id);
    return {
      message: MESSAGE.brand.deleted,
      success: true,
    };
  }
}
