import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema, ProductSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicPricesController } from './public-prices.controller';
import { PublicPricesService } from './public-prices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'precos', schema: PriceSchema },
      { name: 'produtos', schema: ProductSchema }
    ]),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get('multer'),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
  ],
  controllers: [PublicPricesController],
  providers: [PublicPricesService, ]
})
export class PublicPricesModule { }
