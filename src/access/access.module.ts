import { Module } from '@nestjs/common';
import { AccessController } from './access.controller'
import { AccessService } from './access.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'acessos', schema: AccessSchema }
    ]),
  ],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService]
})
export class AccessModule { }
