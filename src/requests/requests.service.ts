import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { CreateRequestDto } from './dto/create-request.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor (private readonly prisma: PrismaService) {}

  create(createRequestDto: CreateRequestDto, token: string) {
    // const user = ExtractJwt.fromAuthHeaderAsBearerToken(token)
    // console.log(user)
    return 'ok'
  }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
