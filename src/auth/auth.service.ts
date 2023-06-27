import { Injectable, Dependencies, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    const passMatch = await bcrypt.compare(password, user.password)

    if (!passMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userData: CreateUserDto) {
    try {
        const candidate = await this.prisma.user.findUnique({
          where: {
            email: userData.email
          }
        })
  
        if (candidate) {
          throw new HttpException('User with provided credentials already exists.', HttpStatus.CONFLICT);
        }
  
        return await this.prisma.user.create({
          data: {
            ...(userData),
            password: await hash(userData.password, 7)
          }
        });
    } catch (error) {
        console.error(error.message);
        throw error;
        }
    }
}