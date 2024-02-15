import { RegisterDTO } from './../auth/auth.dto';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(userDto: RegisterDTO) {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll(id:number): Promise<User[]> {
    const data =await this.usersRepository.
    createQueryBuilder("user")
    .where('user.id != :id', {id})
    .getMany()
    return data
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        // products: true,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        pic_url: true,
        role:true
      },
    });
    if (user) {
      return user;
    } else {
      return new NotFoundException('user not found');
    }
  }

  async update(data) {
    return this.usersRepository.update({ id: data.id }, { ...data });
  }

  async updatePic(id: number, file: any) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      this.usersRepository.update({ id }, { pic_url: file.filename });
      return 'Updated';
    } else {
      return new NotFoundException('user not found');
    }
  }
  async updateData(id: number, updateUserDto:UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      this.usersRepository.update({ id }, updateUserDto);
      return 'Updated - ' + user.email;
    } else {
      return new NotFoundException('user not found');
    }
  }

  async changePassword(data: ChangePasswordDto, id:number) {
    const user = await this.usersRepository.findOneBy({ id });
    console.log(user);
    let comp1 = bcrypt.compareSync(data.currentPassword, user.password);
    let comp = bcrypt.compareSync(data.password, user.password);
    console.log(data);
    console.log(comp1);

    if (!comp1) {
      throw new HttpException('Wrong passwors', HttpStatus.BAD_REQUEST);
    }

    if (!!comp) {
      throw new HttpException(
        'Current and new password can not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (data.password === data.confirmationPassword) {
      if (user) {
        this.usersRepository.update(
          { id: id },
          { password: bcrypt.hashSync(data.password, 10) },
        );
        return 'password updated';
      } else {
        throw new NotFoundException('user not found');
      }
    } else {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<string> {
    const us = await this.usersRepository.findOneBy({ id });
    if (us) {
      this.usersRepository.delete({ id })
      return "delete user - " + us.name;
    } else {
      throw new NotFoundException('user not found');
    }
  }
}
