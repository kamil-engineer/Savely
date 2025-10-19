import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorResponseDto } from 'src/shared/all-exception-filter/error.dto';

import { EnvService } from '../config/env.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-user.response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: EnvService,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: ErrorResponseDto,
  })
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { tokens, user } = await this.authService.login(loginUserDto);
    const isProd = this.config.get('NODE_ENV') === 'production';

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user };
  }
}
