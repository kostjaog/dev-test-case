import { Injectable } from '@nestjs/common';
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
      return candidate;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
}
