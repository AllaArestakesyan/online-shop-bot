import { ApiProperty } from "@nestjs/swagger";

export class CreateDesignDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    description:string
    
    @ApiProperty()
    pic_url:string
}
