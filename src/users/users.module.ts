import { Module } from '@nestjs/common';
import { UsersImport } from './users.import';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignatureSchema } from 'src/schema/signature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'usuarios', schema: UserSchema },
      { name: 'assinaturas', schema: SignatureSchema }
    ]),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get('multer'),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersImport],
  exports: [UsersService]
})
export class UsersModule { }
