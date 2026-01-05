import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JWTService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { AUTH_ERROR_CONSTANTS } from './constants/auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/login-user.response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetService } from './password-reset/password-reset.service';
import { env } from '../config/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
  ) {}
  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_CONSTANTS.INVALID_CREDENTIALS);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException(AUTH_ERROR_CONSTANTS.INVALID_CREDENTIALS);
    }

    const tokens = await this.jwtService.generateTokens({
      email,
      sub: String(user.id),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 12);

    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    const safeUser = plainToInstance(LoginResponseDto, user, { excludeExtraneousValues: true });

    return { tokens, user: safeUser };
  }

  async register({ email, password, fullName }: RegisterUserDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException(AUTH_ERROR_CONSTANTS.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await this.userService.createUser({
      email,
      fullName,
      password: hashedPassword,
    });

    await this.mailService.sendWelcomeEmail(email, fullName);

    return createdUser;
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      await this.passwordResetService.invalidateTokens(user.id);

      const token = await this.passwordResetService.createToken(user.id);

      const link = `${env.APP_URL}reset-password?token=${token}`;

      await this.mailService.sendResetPasswordEmail(user.email, link);
    }

    return {
      message: 'If an account with this email exists, a reset link has been sent.',
    };
  }
}
