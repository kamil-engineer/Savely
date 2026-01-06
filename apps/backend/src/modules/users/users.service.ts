import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async updatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });
  }

  async createUser({ email, fullName, password }: RegisterUserDto) {
    return this.prisma.user.create({
      data: {
        email,
        fullName,
        password,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
      },
    });
  }
}
