import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateCityService } from './state-city.service';
import { StateCityController } from './state-city.controller';
import { StateSchema, CitySchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'estados', schema: StateSchema },
      { name: 'cidades', schema: CitySchema },
    ]),
  ],
  controllers: [StateCityController],
  providers: [StateCityService]
})
export class StateCityModule { }
