import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'perguntas-frequentes', schema: FAQSchema },
    ]),
  ],
  controllers: [FaqController],
  providers: [FaqService]
})
export class FaqModule {}
