import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const imageCategory = ['logo', 'produto'] as const;
export type ImageCategory = typeof imageCategory[number];

export type ImageDocument = Image & mongoose.Document;

@Schema()
export class Image {
  @ApiProperty()
  @Prop()
  url: string;
  @ApiProperty()
  @Prop()
  id?: number;
  @ApiProperty()
  @Prop()
  codigo_barras: string;
  @ApiProperty()
  @Prop({ enum: imageCategory })
  categoria: ImageCategory;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
ImageSchema.index({ id: 1, categoria: 1 });
ImageSchema.index({ codigo_barras: 1, categoria: 1 });
ImageSchema.set('toObject', { virtuals: true });
ImageSchema.set('toJSON', { virtuals: true });
ImageSchema.virtual('produto', {
  ref: 'produtos',
  localField: 'codigo_barras',
  foreignField: 'codigo_barras',
  justOne: true
});

ImageSchema.virtual('mercado', {
  ref: 'mercados',
  localField: 'id',
  foreignField: 'id',
  justOne: true
});
