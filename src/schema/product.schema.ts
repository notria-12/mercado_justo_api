import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { uf, UF } from '.';

export const unidade = ['gr', 'kg', 'unid'] as const;
export type Unidade = typeof unidade[number];

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @ApiProperty()
  @Prop()
  descricao: string;
  @ApiProperty()
  @Prop()
  codigo_barras: string[];
  @ApiProperty()
  @Prop()
  categoria_1: string;
  @ApiProperty()
  @Prop()
  categoria_2: string;
  @ApiProperty()
  @Prop()
  categoria_3: string;
  @ApiProperty({ enum: unidade })
  @Prop()
  unidade: Unidade;
  @ApiProperty()
  @Prop()
  cidade: string;
  @ApiProperty({ enum: uf })
  @Prop()
  uf: UF;
  @ApiProperty()
  @Prop({ default: null })
  ordem?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ codigo_barras: 1, cidade: 1 });
ProductSchema.index({ descricao: 'text' });