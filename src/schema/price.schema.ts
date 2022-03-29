import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/schema';

export type PriceDocument = Price & mongoose.Document;

@Schema()
export class Price {
  @ApiProperty({ type: Product })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'produtos' })
  produto: Product | string;
  @ApiProperty()
  @Prop()
  id: number;
  @ApiProperty()
  @Prop()
  preco: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
PriceSchema.set('timestamps', {
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});
PriceSchema.index({ id: 1, produto: 1 });