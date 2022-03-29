import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { uf, UF } from '.';

export type SupermarketDocument = Supermarket & mongoose.Document;

@Schema()
export class Supermarket {
  @ApiProperty()
  @Prop()
  nome: string;
  @ApiProperty()
  @Prop()
  id: number;
  @ApiProperty()
  @Prop()
  site: string;
  @ApiProperty()
  @Prop()
  cnpj: string;
  @ApiProperty()
  @Prop()
  latitude: number;
  @ApiProperty()
  @Prop()
  longitude: number;
  @ApiProperty()
  @Prop()
  telefone: string;
  @ApiProperty()
  @Prop()
  endereco: string;
  @ApiProperty()
  @Prop()
  cidade: string;
  @ApiProperty({ enum: uf })
  @Prop()
  uf: UF;
  @ApiProperty()
  @Prop({ default: null })
  ordem?: number;
  @ApiProperty()
  @Prop({ default: false })
  visivel: boolean;
}

export const SupermarketSchema = SchemaFactory.createForClass(Supermarket);
SupermarketSchema.index({ id: 1 });
SupermarketSchema.index({ nome: 1 });
SupermarketSchema.set('toObject', { virtuals: true });
SupermarketSchema.set('toJSON', { virtuals: true });
SupermarketSchema.virtual('responsavel', {
  ref: 'usuarios',
  localField: 'id',
  foreignField: 'responsavel_mercados',
  justOne: true,
})