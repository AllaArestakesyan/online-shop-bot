import { PartialType } from '@nestjs/swagger';
import { CreateImageProductDto } from './create-image-product.dto';

export class UpdateImageProductDto extends PartialType(CreateImageProductDto) {}
