import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './dto/auth.dto';
import { LoginEntity, SignUpEntity } from './models/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: SignUpEntity,
  })
  async signUp(@Body() user: SignUpDto): Promise<boolean> {
    return this.authService.signUp(user);
  }

  @Post('/login')
  @ApiOperation({ summary: 'login with username and password' })
  @ApiCreatedResponse({
    description: 'The user has been successfully login.',
    type: LoginEntity,
  })
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginEntity> {
    const data = await this.authService.login(user.userName, user.password);
    res.cookie('accessToken', data.accessToken, { httpOnly: true });
    return data;
  }
}
