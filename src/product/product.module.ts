import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImageProductService } from 'src/image-product/image-product.service';
import { ImageProductModule } from 'src/image-product/image-product.module';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User]), ImageProductModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
