import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const orientacao = ['masculino', 'feminino', 'outros'] as const;
export type Orientacao = typeof orientacao[number];
export const uf = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
  'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
] as const;
export type UF = typeof uf[number];
export const tipoConta = ['admin', 'operador', 'gerente', 'cliente'] as const;
export type TipoConta = typeof tipoConta[number];
export const permissoes = [
  'imagens', 'precos', 'usuarios', 'produtos', 'mercados', 'edicao_textos_app', 'gerenciamento_dados',
] as const;
export type Permissoes = typeof permissoes[number];


export type UserDocument = User & mongoose.Document;

export class Address {
  @ApiProperty()
  @Prop()
  rua: string;
  @ApiProperty()
  @Prop()
  numero: string;
  @ApiProperty()
  @Prop()
  complemento?: string;
  @ApiProperty()
  @Prop()
  bairro?: string;
  @ApiProperty()
  @Prop()
  cidade: string;
  @ApiProperty({ enum: uf })
  @Prop()
  uf: UF;
  @ApiProperty()
  @Prop()
  cep: string;
}

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  nome: string;
  @ApiProperty()
  @Prop()
  cpf: string;
  @ApiProperty()
  @Prop()
  email: string;
  @ApiProperty()
  @Prop()
  telefone: string;
  @ApiProperty()
  @Prop()
  orientacao: Orientacao;
  @ApiProperty()
  @Prop()
  idade: number;
  @ApiProperty({ type: Address })
  @Prop()
  endereco: Address;
  @ApiProperty()
  @Prop({ default: new Date() })
  data_cadastro: Date;
  @ApiProperty()
  @Prop({ default: false })
  status_assinante: boolean;
  @ApiProperty()
  @Prop()
  data_assinatura?: Date;
  @ApiProperty()
  @Prop()
  data_assinatura_cancelada?: Date;
  @ApiProperty()
  @Prop({ default: new Date() })
  ultimo_acesso?: Date;
  @ApiProperty()
  @Prop({ default: 0 })
  compartilhamentos: number;
  @ApiHideProperty()
  @Prop()
  senha?: string;
  @ApiProperty()
  @Prop({ type: [Number] })
  responsavel_mercados: number[];
  @ApiProperty({ enum: tipoConta })
  @Prop()
  tipo_conta: TipoConta;
  @ApiProperty({ enum: permissoes })
  @Prop()
  permissoes: Permissoes[];
  @ApiProperty()
  @Prop()
  google_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ google_id: 1 });
UserSchema.index({ email: 1, cpf: 1 });
UserSchema.index({ data_assinatura: 1, status_assinante: 1 });
UserSchema.index({ data_assinatura_cancelada: 1, status_assinante: 1 });
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.virtual('mercado', {
  ref: 'mercados',
  localField: 'responsavel_mercados',
  foreignField: 'id',
  justOne: true
});
