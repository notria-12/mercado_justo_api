import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const tipoToken = ['recuperar-senha', 'login-email'] as const;
export type TipoToken = typeof tipoToken[number];

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @ApiProperty()
  @Prop()
  email: string;
  @ApiProperty()
  @Prop()
  token: string;
  @ApiProperty()
  @Prop({ default: () => new Date() })
  data_criado: Date;
  @ApiProperty()
  @Prop({ default: false })
  usado: boolean;
  @ApiProperty()
  @Prop({ enum: tipoToken })
  tipo: TipoToken;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.index({ email: 1 });