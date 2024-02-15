import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO, VerificationDto } from '../auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    
    console.log(user, pass);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.email,
      userId: user.id,
      role: user.role,
      
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: RegisterDTO) {
    const { email, name, surname, password, role } = userDto;
    const user = await this.userService.findOne(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    } else {
      const createdUser = await this.userService.create({
        name,
        surname,
        email,
        password: bcrypt.hashSync(password, 10),
        role
      });

      try{

        // const url = `http://localhost:3000/login`;
        // await this.mailerService.sendMail({
        //   to: email,
        //   from: 'arestakesyan1994@mail.ru',
        //   subject: 'Welcome to Shop! Confirm your Email',
        //   html: `Hi! There, You have recently visited 
        //   our website and entered your email.
        //   Please follow the given link to verify your email
        //   <a href='${url}'>click</a> 
          
        //   Thanks`
        // });
      }catch(e){
        console.log(e.message);
      }
      return createdUser;
    }
  }
  
 
}