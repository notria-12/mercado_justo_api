import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/schema';

export type LogDocument = Log & mongoose.Document;

export const acao = ['criar', 'atualizar', 'remover', 'remover-muitos', 'criar-muitos'] as const;
export type Acao = typeof acao[number];

@Schema()
export class Log {
  @ApiProperty()
  @Prop({ enum: acao })
  acao: Acao;
  @ApiProperty()
  @Prop()
  colecao: string;
  @ApiProperty({ type: User })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' })
  usuario: User | string;
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  documento: string;
  @ApiProperty()
  @Prop()
  data: Date;
  @ApiProperty()
  @Prop()
  ip: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
