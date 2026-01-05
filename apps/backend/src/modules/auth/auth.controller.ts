import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorResponseDto } from './../../shared/all-exception-filter/error.dto';

import { EnvService } from '../config/env.service';
import { AuthService } from './auth.service';
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-user.response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseDto } from './dto/register-user.response.dto';
import { ForgotPasswordDto } from './password-reset/dto/forgot-password.dto';
import { ForgotPasswordResponseDto } from './password-reset/dto/forgot-password.response.dto';
import { ResetPasswordDto } from './password-reset/dto/reset-password.dto';
import { ResetPasswordSuccessDto } from './password-reset/dto/reset-password.response.dto';
import { Throttle } from '@nestjs/throttler';

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
      maxAge: AUTH_CONSTANTS.MAX_ACCESS_TOKEN_AGE,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: AUTH_CONSTANTS.MAX_REFRESH_TOKEN_AGE,
    });

    return { user };
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (invalid email, password, or full name)',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected server error',
    type: ErrorResponseDto,
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Throttle({ default: { limit: 3, ttl: 86400 } })
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset.' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Reset email sent if account exists',
    type: ForgotPasswordResponseDto,
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Throttle({ default: { limit: 3, ttl: 86400 } })
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using a valid token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password successfully reset',
    type: ResetPasswordSuccessDto,
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
