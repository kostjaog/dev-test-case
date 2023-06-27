import {
Body,
Controller,
Get,
HttpCode,
HttpStatus,
Post,
Request,
UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from 'src/users/dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

@HttpCode(HttpStatus.OK)
@Post('login')
signIn(@Body() signInData: LoginDTO) {
    return this.authService.signIn(signInData.email, signInData.password);
}

@UseGuards(AuthGuard)
@Get('whoami')
getProfile(@Request() req) {
    return req.user;
}

@HttpCode(HttpStatus.OK)
@Post('register')
register(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
}
}