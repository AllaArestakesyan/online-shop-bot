import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ImageProductModule } from './image-product/image-product.module';
import { ImageProduct } from './image-product/entities/image-product.entity';
import { DesignModule } from './design/design.module';
import { Design } from './design/entities/design.entity';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/entities/bot.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    // OrderModule,
    CategoryModule,
    ImageProductModule,
    DesignModule,
    BotModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test1',
      entities: [User, Product, Category, ImageProduct, Design, Bot],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
// https://www.learmoreseekmore.com/2022/05/part-1-email-sending-in-nestjs-app.html
