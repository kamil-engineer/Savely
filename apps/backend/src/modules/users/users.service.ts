import { Injectable } from '@nestjs/common';

import { PrismaService } from './../../modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
