import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { Design } from './entities/design.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Design])],
  controllers: [DesignController],
  providers: [DesignService]
})
export class DesignModule {}
