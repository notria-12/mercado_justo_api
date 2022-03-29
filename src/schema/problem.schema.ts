import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const tipoProblema = ['erro_tela_leitor', 'produto_sem_cadastro'] as const;
export type TipoProblema = typeof tipoProblema[number];

export type ProblemDocument = Problem & mongoose.Document;

@Schema()
export class Problem {
  @ApiProperty()
  @Prop()
  codigo_barras: string;
  @ApiProperty()
  @Prop({ default: new Date() })
  data_hora: Date;
  @ApiProperty()
  @Prop({ enum: tipoProblema })
  tipo: TipoProblema;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
ProblemSchema.index({ tipo: 1, codigo_barras: 1 });