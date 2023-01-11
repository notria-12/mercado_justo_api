import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicProductsController } from './public-products.controller';
import { PublicProductsService } from './public-products.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'produtos', schema: ProductSchema }
      ]),
      MulterModule.registerAsync({
        useFactory: async (configService: ConfigService) => configService.get('multer'),
        imports: [ConfigModule],
        inject: [ConfigService]
      }),
    ],
    controllers: [PublicProductsController],
    providers: [PublicProductsService]
  })
export class PublicProductsModule { }