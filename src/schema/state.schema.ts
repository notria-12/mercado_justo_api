import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type StateDocument = State & Document;

@Schema()
export class State {
  @ApiProperty()
  @Prop()
  ID: string;
  @ApiProperty()
  @Prop()
  sigla: string;
  @ApiProperty()
  @Prop()
  nome: string;
}

export const StateSchema = SchemaFactory.createForClass(State);