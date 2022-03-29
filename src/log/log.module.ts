import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema }
    ])
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule { }
