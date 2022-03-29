import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard, JwtStrategy } from './jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles';
import { PermissionsGuard } from './permissions';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    ConfigModule,
    MailModule,
    TokenModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule { }
