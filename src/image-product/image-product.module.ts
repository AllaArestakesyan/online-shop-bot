import { Module } from '@nestjs/common';
import { ImageProductService } from './image-product.service';
// import { ImageProductController } from './image-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageProduct } from './entities/image-product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageProduct, Product])],
  // controllers: [ImageProductController],
  providers: [ImageProductService],
  exports:[ImageProductService]
})
export class ImageProductModule {}
