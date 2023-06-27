import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiQuery, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor( private readonly usersService: UsersService) {}
}