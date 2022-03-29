import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FAQDocument = FAQ & mongoose.Document;

@Schema()
export class FAQ {
  @ApiProperty()
  @Prop()
  pergunta: string;
  @ApiProperty()
  @Prop()
  resposta: string;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
