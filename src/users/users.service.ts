import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import {compare, hash} from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async createUser(userCreateDto: Prisma.UserCreateInput): Promise<any> {

    const user = await this.prisma.user.findFirst({
        where: {email: userCreateDto.email}
    });

    if (user) {
        throw new HttpException("user_already_exist", 
           HttpStatus.CONFLICT);
    }

    return await this.prisma.user.create({
        data: {
          ...(userCreateDto),
          password: await hash(userCreateDto.password, 10)
        }
    });

  }

  async findByLogin({email, password}: LoginUserDto) {

      const user = await this.prisma.user.findFirst({
          where: {email}
      });

      if (!user) {
          throw new HttpException("invalid_credentials",  
                HttpStatus.UNAUTHORIZED);
      }

      // compare passwords
      const areEqual = await compare(password, user.password);

      if (!areEqual) {
          throw new HttpException("invalid_credentials",
              HttpStatus.UNAUTHORIZED);
      }

      const {password: p, ...rest} = user;
      return rest;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
