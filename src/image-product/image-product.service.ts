import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { ImageProduct } from './entities/image-product.entity';
import * as fs from 'fs'
import { join } from 'path';

@Injectable()
export class ImageProductService {
  constructor(
    @InjectRepository(ImageProduct)
    private imageRepository: Repository<ImageProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createImageProductDto: CreateImageProductDto, id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) {
      const img = this.imageRepository.create({
        ...createImageProductDto,
        product
      });
      return this.imageRepository.save(img);
    } else {
      throw new NotFoundException('product not found');
    }
  }
 

  async findAll() {
    const data = await this.imageRepository.find()
    if (data) {
      return data
    } else {
      throw new NotFoundException('ImageProduct not found')
    }
  }

  async findOne(id: number) {
    const ImageProduct = await this.imageRepository.findOne({
      where: { id },
    });
    if (ImageProduct) {
      return ImageProduct;
    } else {
      throw new NotFoundException('ImageProduct not found');
    }
  }

  async remove(id: number): Promise<string> {
    const img = await this.imageRepository.findOneBy({ id });
    if (img) {
      fs.unlinkSync(join(__dirname, '..\\..', 'uploads\\')+img.name)
      this.imageRepository.delete({ id })
      return "delete image by id ";
    } else {
      throw new NotFoundException('img not found');
    }
  }

  async removeByProductId(id: number): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });
    if(product){
      const imgs = await this.imageRepository.find({
        where: { product }
      });
      this.imageRepository.delete({ product })
      for(let e of imgs){
        fs.unlinkSync(join(__dirname, '..\\..', 'uploads\\')+e.name)
      }
    }
    return "delete image by product id ";
  }
}