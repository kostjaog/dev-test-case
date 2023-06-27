import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/auth-payload.dto';
import { CreateRequestDto } from './dto/create-request.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from '@prisma/client';
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

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }
}
