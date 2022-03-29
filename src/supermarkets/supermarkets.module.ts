import { Module } from '@nestjs/common';
import { SupermarketsImport } from './supermarkets.import';
import { SupermarketsService } from './supermarkets.service';
import { SupermarketsController } from './supermarkets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupermarketSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [SupermarketsController],
  providers: [SupermarketsService, SupermarketsImport]
})
export class SupermarketsModule { }
