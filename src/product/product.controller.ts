import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request, Res, UseInterceptors, UploadedFiles, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/user/role/roles.decorator';
import { Role } from 'src/user/role/enum.role';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { retryWhen } from 'rxjs';
import { ImageProductService } from 'src/image-product/image-product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private imageProductService: ImageProductService
  ) { }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.MANAGER)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: "string" },
        price: { type: "number" },
        description: { type: "string" },
        cat: { type: "number" },
        liter: { type: "number" },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', null, multerOptions))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<any>,
    @Request() req,
    @Res() res: Response) {
    try {
      console.log("createProductDto",createProductDto);
      console.log("files",files);
      
      const data = await this.productService.create({ ...createProductDto }, files, req.user.userId);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query("text") text:string) {
    console.log(text);
    
    return this.productService.findAll(text);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/findAllByUserId/:id')
  findAllByUserId(@Param("id") id:string) {
    return this.productService.findAllByUserId(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.findOne(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }


  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.MANAGER)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    try {
      const data = await this.productService.update(+id, updateProductDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.MANAGER)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Patch('updatePic/:id')
  async updatePic(@Param('id') id: string,
    @UploadedFile() file,
    @Res() res: Response) {
    try {
      const data = await this.imageProductService.create({ name: file.filename }, +id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.MANAGER)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.remove(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.MANAGER)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('removePic/:id')
  async removePic(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.imageProductService.remove(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}