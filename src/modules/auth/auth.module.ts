import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module';
import { UserSchema } from '../users/models/users.schema';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    UsersModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule, JwtStrategy, RolesGuard],
})
export class AuthModule {}
