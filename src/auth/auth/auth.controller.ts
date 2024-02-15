import { Controller, HttpCode, HttpStatus, Request, Get, Post, Body, Query, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/role/enum.role';
import { HasRoles } from 'src/user/role/roles.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LocalAuthGuard } from '../local-auth.guard';
import { RolesGuard } from '../roles.guard';
import { RegisterDTO, VerificationDto } from '../auth.dto';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

export class Us {
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
}

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private userService: UserService,
    ) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() us: Us, @Request() req) {
    console.log(us);
    
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return this.userService.findOneById(req.user.userId);
  }

 
}
