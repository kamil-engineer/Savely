import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JWTService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { AUTH_ERROR_CONSTANTS } from './constants/auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto/login-user.response.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
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

    return createdUser;
  }
}
