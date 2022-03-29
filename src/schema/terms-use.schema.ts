import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TermsUseDocument = TermsUse & mongoose.Document;

@Schema()
export class TermsUse {
  @ApiProperty()
  @Prop()
  texto: string;
}

export const TermsUseSchema = SchemaFactory.createForClass(TermsUse);
