import { ApiProperty } from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export class CreateProductDto implements SchemaObject {
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    liter: number;

    
    @ApiProperty()
    cat: number;

    

}
