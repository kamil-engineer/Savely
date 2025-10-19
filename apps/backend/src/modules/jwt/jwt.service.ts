import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWT_CONSTANTS } from './constants/jwt-constants';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class JWTService {
  constructor(private jwt: JwtService) {}

  async generateAccessToken(payload: JwtPayload) {
    return this.jwt.signAsync(payload, {
      secret: JWT_CONSTANTS.ACCESS_TOKEN_SECRET,
      expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_EXPIRATION,
    });
  }

  async generateRefreshToken(payload: JwtPayload) {
    return this.jwt.signAsync(payload, {
      secret: JWT_CONSTANTS.REFRESH_TOKEN_SECRET,
      expiresIn: JWT_CONSTANTS.REFRESH_TOKEN_EXPIRATION,
    });
  }

  async generateTokens(payload: JwtPayload) {
    const [access_token, refresh_token] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return { access_token, refresh_token };
  }
}
