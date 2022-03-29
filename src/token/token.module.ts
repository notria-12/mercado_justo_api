import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/schema'
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tokens', schema: TokenSchema },
    ]),
    UsersModule,
    ConfigModule
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule { }
