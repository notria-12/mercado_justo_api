import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { SupermarketSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicSupermarketsController } from './public-supermarkets.controller';
import { PublicSupermarketsService } from './public-supermarkets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'mercados', schema: SupermarketSchema }
    ]),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get('multer'),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
  ],
  controllers: [PublicSupermarketsController],
  providers: [PublicSupermarketsService]
})
export class PublicSupermarketsModule { }
