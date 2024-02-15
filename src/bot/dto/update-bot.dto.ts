import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends PartialType(CreateBotDto) {

    @ApiProperty()
    ask: string;
    @ApiProperty()
    answer: string;
}
