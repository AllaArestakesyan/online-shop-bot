import { ApiProperty } from "@nestjs/swagger";

export class CreateBotDto {

    @ApiProperty()
    ask: string;
    @ApiProperty()
    answer: string;
}
