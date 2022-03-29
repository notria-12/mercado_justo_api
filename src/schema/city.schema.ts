import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CityDocument = City & Document;

@Schema()
export class City {
  @ApiProperty()
  @Prop()
  ID: string;
  @ApiProperty()
  @Prop()
  nome: string;
  @ApiProperty()
  @Prop()
  estado: string;
}

export const CitySchema = SchemaFactory.createForClass(City);