import { Module } from '@nestjs/common';

import { JWTModule } from '../jwt/jwt.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [JWTModule, UsersModule, MailModule, PasswordResetModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
