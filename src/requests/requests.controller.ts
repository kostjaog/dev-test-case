import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards, Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResolveRequestDto } from './dto/resolve-request.dto';
import { REQUEST_STATUS } from '@prisma/client';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request as RequestEntity } from '@prisma/client';
// import { RequestEntity } from './entities/request.entity';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createRequestDto: CreateRequestDto, @Headers() headers: {authorization: string}) {
    const response = await this.requestsService.create(createRequestDto, req.user);
    return response;
  }

  @UseGuards(AuthGuard)
  @ApiParam({name: 'requestId', required: true, type: 'string'})
  @Post('/resolve/:requestId')
  async resolve(@Request() req, @Body() resolveRequestDto: ResolveRequestDto, @Param() params: {requestId: string}) {
    const response = await this.requestsService.resolve(resolveRequestDto, req.user, params.requestId);
    return response;
  }
  
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.requestsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @ApiParam({name: 'requestId', required: true, type: 'string'})
  @Get(':requestId')
  findOne(@Request() req, @Param('requestId') requestId: string) {
    return this.requestsService.findOne(requestId, req.user);
  }

  @UseGuards(AuthGuard)
  @ApiParam({name: 'dateOrder', required: true, schema: {enum: ['desc', 'asc']}})
  @ApiParam({name: 'status', required: true, enum: ['RESOLVED', 'ACTIVE']})
  @Get('/filtered/:status/:dateOrder')
  findFiltered(@Request() req, @Param() params: {status: REQUEST_STATUS, dateOrder: 'asc' | 'desc'}) {
    return this.requestsService.findFiltered(params.status, params.dateOrder, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/getAllMyRequests')
  getAllMyRequests(@Request() req) {
    return this.requestsService.getAllMy(req.user)
  }
}
