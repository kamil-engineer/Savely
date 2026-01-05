import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import * as crypto from 'crypto';
import { hashToken } from './../../../utils/crypto';
import { addMinutes } from './../../../utils/date';
import { PASSWORD_RESET_TOKEN_EXPIRATION_MINUTES } from './password-reset.contansts';

@Injectable()
export class PasswordResetService {
  constructor(private prisma: PrismaService) {}

  async invalidateTokens(userId: number) {
    await this.prisma.passwordResetToken.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() },
    });
  }

  async createToken(userId: number): Promise<string> {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(rawToken);

    await this.prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt: addMinutes(PASSWORD_RESET_TOKEN_EXPIRATION_MINUTES),
      },
    });

    return rawToken;
  }

  async findToken(token: string) {
    const resetToken = await this.prisma.passwordResetToken.findFirst({
      where: { tokenHash: token, usedAt: null, expiresAt: { gt: new Date() } },
      include: { user: true },
    });

    if (resetToken) return resetToken;
  }

  async markTokenUsed(tokenId: string) {
    await this.prisma.passwordResetToken.update({
      where: { id: tokenId },
      data: { usedAt: new Date() },
    });
  }
}
