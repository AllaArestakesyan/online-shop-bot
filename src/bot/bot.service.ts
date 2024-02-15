import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepository: Repository<Bot>
  ) { }

  async create(createBotDto: CreateBotDto) {
    const catgeory = await this.botRepository.findOneBy({ ask: createBotDto.ask });
    if (!catgeory) {
      const cat = this.botRepository.create({
        ...createBotDto,
      });
      return this.botRepository.save(cat);
    } else {
      throw new NotFoundException('ask has already');
    }
  }

  findAll() {
    return this.botRepository.find();
  }

 
  async remove(id: number): Promise<string> {
    const cat = await this.botRepository.findOneBy({ id });
    if (cat) {
      this.botRepository.delete({ id })
      return "delete catgeory - " + cat.ask;
    } else {
      throw new NotFoundException('catgeory not found');
    }
  }
  async update(id: number, updateBotDto:UpdateBotDto): Promise<string> {
    const catgeory = await this.botRepository.findOneBy({ id });
    if (catgeory) {
      await this.botRepository.update(id, updateBotDto)
      return "update catgeory - " + catgeory.ask;
    } else {
      throw new NotFoundException('catgeory not found');
    }
  }
}
