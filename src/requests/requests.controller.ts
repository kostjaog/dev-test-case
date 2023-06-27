import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards, Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResolveRequestDto } from './dto/resolve-request.dto';

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
  @Post('/resolve/:requestId')
  async resolve(@Request() req, @Body() resolveRequestDto: ResolveRequestDto, @Param() params: {requestId: string}) {
    const response = await this.requestsService.resolve(resolveRequestDto, req.user, params.requestId);
    return response;
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }
}
