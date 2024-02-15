import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { ImageProductService } from 'src/image-product/image-product.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private imageProductService: ImageProductService
  ) { }

  async create(createProductDto: CreateProductDto, files: any, id: number) {
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.cat });
    const user = await this.userRepository.findOneBy({ id });
    if (category && user) {
      const prod = this.productRepository.create({
        ...createProductDto,
        user,
        category
      });
      const obj = await this.productRepository.save(prod)
      for (let e of files) {
        await this.imageProductService.create({ name: e.filename }, obj.id)
      }
      return obj;
    } else {
      throw new NotFoundException('category or user not found');

    }
  }

  async findAll(text: string) {
    let data;
    if (text) {
      data = await this.productRepository
        .createQueryBuilder("product")
        .innerJoinAndSelect("product.category", 'category')
        .leftJoinAndSelect("product.pic_url", 'image-product.product')
        .where("product.name like :name", { name: `%${text}%` })
        .getMany()
    } else {

      data = await this.productRepository.find({
        relations: {
          pic_url: true,
          category: true
        },
      })
    }
    if (data) {
      return data
    } else {
      throw new NotFoundException('Product not found')
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        pic_url: true,
      },
    });
    if (product) {
      return product;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async findAllByUserId(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if(user){
      const product = await this.productRepository.find({
        where: { user },
        relations: {
          category: true,
          pic_url: true,
        },
      });
      if (product) {
        return product;
      } else {
        throw new NotFoundException('Product not found');
      }
    }else{
      throw new NotFoundException('user not found');
    }
  }

  async remove(id: number): Promise<string> {
    const prod = await this.productRepository.findOneBy({ id });
    if (prod) {
      await this.imageProductService.removeByProductId(id)
      await this.productRepository.delete({ id })
      return this.findAll('');
    } else {
      throw new NotFoundException('product not found');
    }
  }


  async update(id: number, updateProductDto: UpdateProductDto): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });
    if (product) {
      await this.productRepository.update(id, updateProductDto)
      return "update product - " + product.name;
    } else {
      throw new NotFoundException('product not found');
    }
  }
}
