import { Module } from '@nestjs/common';
import { TermsUseService } from './terms-use.service';
import { TermsUseController } from './terms-use.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TermsUseSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'termos-uso', schema: TermsUseSchema },
    ]),
  ],
  controllers: [TermsUseController],
  providers: [TermsUseService]
})
export class TermsUseModule { }
