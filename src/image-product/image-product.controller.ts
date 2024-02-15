// import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
// import { ImageProductService } from './image-product.service';
// import { CreateImageProductDto } from './dto/create-image-product.dto';
// import { UpdateImageProductDto } from './dto/update-image-product.dto';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Role } from 'src/user/role/enum.role';
// import { HasRoles } from 'src/user/role/roles.decorator';

// @ApiTags("image-product")
// @Controller('image-product')
// export class ImageProductController {
//   constructor(private readonly imageProductService: ImageProductService) {}

//   @HttpCode(HttpStatus.OK)
//   @HasRoles(Role.MANAGER)
//   @ApiBearerAuth('JWT-auth')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Post()
//   create(@Body() createImageProductDto: CreateImageProductDto) {
//     return this.imageProductService.create(createImageProductDto);
//   }

//   @Get()
//   findAll() {
//     return this.imageProductService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.imageProductService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateImageProductDto: UpdateImageProductDto) {
//     return this.imageProductService.update(+id, updateImageProductDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.imageProductService.remove(+id);
//   }
// }
