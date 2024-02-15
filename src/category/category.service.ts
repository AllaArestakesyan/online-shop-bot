import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const catgeory = await this.categoryRepository.findOneBy({ name:createCategoryDto.name });
    if (!catgeory) {
      const cat = this.categoryRepository.create({
        ...createCategoryDto,
      });
      return this.categoryRepository.save(cat);
    } else {
      throw new NotFoundException('cat has already');
    }
  }

  async findAll() {
    const data = await this.categoryRepository.find()
    if (data) {
      return data
    } else {
      throw new NotFoundException('category not found')
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
    if (category) {
      return category;
    } else {
      throw new NotFoundException('category not found');
    }
  }

  async remove(id: number): Promise<string> {
    const cat = await this.categoryRepository.findOneBy({ id });
    if (cat) {
      this.categoryRepository.delete({ id })
      return "delete catgeory - " + cat.name;
    } else {
      throw new NotFoundException('catgeory not found');
    }
  }
  async update(id: number, updateCategoryDto:UpdateCategoryDto): Promise<string> {
    const catgeory = await this.categoryRepository.findOneBy({ id });
    if (catgeory) {
      await this.categoryRepository.update(id, updateCategoryDto)
      return "update catgeory - " + catgeory.name;
    } else {
      throw new NotFoundException('catgeory not found');
    }
  }
}
