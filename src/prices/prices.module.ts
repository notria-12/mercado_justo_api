import { Module } from '@nestjs/common';
import { PricesImport } from './prices.import';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema, ProductSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [PricesController],
  providers: [PricesService, PricesImport]
})
export class PricesModule { }
