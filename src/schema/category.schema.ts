import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
  @ApiProperty()
  @Prop()
  nome: string;
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categorias' })
  pai: Category | string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
