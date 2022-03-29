import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('mailer'),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    TokenModule
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
