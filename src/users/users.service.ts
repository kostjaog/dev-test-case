import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  async findOne(email: string): Promise<User> {
    try {
      const candidate = await this.prisma.user.findFirst({
        where: {
          email
        }
      });
      if (!candidate) {
        throw new Error('User with provided id does not exist.');
      }
      console.log(candidate)
      return candidate;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
}
