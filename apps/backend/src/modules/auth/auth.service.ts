import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JWTService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
  ) {}
  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.jwtService.generateTokens({
      email,
      sub: String(user.id),
    });

    return { tokens, user: { id: user.id, email: user.email } };
  }
}
