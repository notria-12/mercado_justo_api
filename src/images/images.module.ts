import { BadRequestException, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, ProductSchema, SupermarketSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'imagens', schema: ImageSchema },
      { name: 'produtos', schema: ProductSchema },
      { name: 'mercados', schema: SupermarketSchema }
    ]),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          storage: configService.get('multer').storage,
          fileFilter: function (req, file, cb) {
            const allowedTypes = ['image/png', 'image/jpeg'];
            if (allowedTypes.includes(file.mimetype)) {
              cb(null, true);
            } else {
              cb(new BadRequestException({
                message: 'Os tipos permitidos são .png e .jpg',
                data: {}
              }), false);
            }
          },
        }
      },
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    ConfigModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
