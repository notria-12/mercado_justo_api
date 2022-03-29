import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'problemas', schema: ProblemSchema }
    ]),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class ProblemsModule { }
