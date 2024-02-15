import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { Design } from './entities/design.entity';
import * as fs from 'fs'
import { join } from 'path';

@Injectable()
export class DesignService {

  constructor(
    @InjectRepository(Design)
    private designRepository: Repository<Design>,
  ) { }

  create(createDesignDto: CreateDesignDto) {
    const img = this.designRepository.create({
      ...createDesignDto
    });
    return this.designRepository.save(img);
  }

  async findAll() {
    const data = await this.designRepository.find()
    if (data) {
      return data
    } else {
      throw new NotFoundException('Design not found')
    }
  }

  async findOne(id: number) {
    const design = await this.designRepository.findOne({
      where: { id },
    });
    if (design) {
      return design;
    } else {
      throw new NotFoundException('design not found');
    }
  }

  // update(id: number, updateDesignDto: UpdateDesignDto) {
  //   return `This action updates a #${id} design`;
  // }

  async remove(id: number): Promise<string> {
    const design = await this.designRepository.findOneBy({ id });
    if (design) {
      if(design.pic_url){
        fs.unlinkSync(join(__dirname, '..\\..', 'uploads\\')+design.pic_url)
      }
      this.designRepository.delete({ id })
      return "delete design by id ";
    } else {
      throw new NotFoundException('design not found');
    }
  }
}
