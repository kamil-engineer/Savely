import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '../../shared/swagger/decorators/api-error-responses.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: EnvService,
  ) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Login an existing user',
    description: 'Authenticates user and sets HTTP-only cookies with access and refresh tokens',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResponseDto,
  })
  @ApiConflictResponse('Email already exists')
  @ApiBadRequestResponse('Invalid email or password format')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
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

    return { ...user };
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Register user',
    description: 'Creates a new user account with email, password, and full name',
  })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse('Invalid email, password, or full name format')
  @ApiConflictResponse('Email already exists')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Throttle({ default: { limit: 3, ttl: 86400000 } })
  @Post('forgot-password')
  @ApiOperation({
    summary: 'Request password reset.',
    description:
      'Sends password reset email if account exists. Rate limited to 3 requests per 24 hours.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Reset email sent if account exists',
    type: ForgotPasswordResponseDto,
  })
  @ApiBadRequestResponse('Invalid email format')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Throttle({ default: { limit: 3, ttl: 86400000 } })
  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset user password using a valid token',
    description:
      'Resets password using valid reset token. Rate limited to 3 attempts per 24 hours.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password successfully reset',
    type: ResetPasswordSuccessDto,
  })
  @ApiBadRequestResponse('Invalid token or password format')
  @ApiUnauthorizedResponse('Invalid or expired reset token')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
