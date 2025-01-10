import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          // expiresIn: '120s', // Adjust as needed on 15m
          expiresIn: '3600s', // Adjust as needed on 15m
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, UsersService, JwtStrategy],
})
export class AuthModule {}
