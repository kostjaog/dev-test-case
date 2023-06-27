import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/auth-payload.dto';
import { CreateRequestDto } from './dto/create-request.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST_STATUS, Request } from '@prisma/client';
import { ResolveRequestDto } from './dto/resolve-request.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RequestsService {
  constructor (private readonly prisma: PrismaService, private readonly mailService: MailService) {}

  async create(createRequestDto: CreateRequestDto, userPayload: AuthPayloadDto): Promise<Request> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.prisma.request.create({
      data: {
        ...createRequestDto,
        author: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  async resolve(resolveRequestDto: ResolveRequestDto, userPayload: AuthPayloadDto, requestId: string): Promise<Request> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })
    if (!user || user.role !== 'MODERATOR') {
      throw new UnauthorizedException();
    }
    const oldRequest = await this.prisma.request.findUnique({
      where: {
        id: requestId
      },
      include: {
        author: true
      }
    })

    if (!oldRequest) {
      throw new HttpException('No request with provided id', HttpStatus.BAD_REQUEST)
    }
    // This will send email-message in case of real mail credentials
    // await this.mailService.sendUserResolveInfo(oldRequest.author.email, resolveRequestDto.comment); 

    return this.prisma.request.update({
      where: {
        id: requestId
      },
      data: {
        comment: resolveRequestDto.comment,
        status: 'RESOLVED',
        moderator: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  async findAll(userPayload: AuthPayloadDto): Promise<Request[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })
    if (user.role !== 'MODERATOR') {
      throw new UnauthorizedException();
    }
    return this.prisma.request.findMany({});
  }

  async findFiltered(status: REQUEST_STATUS, dateOrder: 'asc' | 'desc', userPayload: AuthPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })
    if (user.role !== 'MODERATOR') {
      throw new UnauthorizedException();
    }

    return this.prisma.request.findMany({
      where: {
        status,
      },
      orderBy:{
        createdAt: dateOrder 
      }
    })
  }

  async findOne(id: string, userPayload: AuthPayloadDto): Promise<Request> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })
    const request = await this.prisma.request.findUnique({
      where: {
        id
      }
    })
    if (user.role !== 'MODERATOR' || request.authorId !== user.id) {
      throw new UnauthorizedException();
    }
    return request;
  }

  async getAllMy(userPayload: AuthPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userPayload.email
      }
    })

    return this.prisma.request.findMany({
      where: {
        authorId: user.id
      }
    })
  }
}
