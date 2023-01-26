import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type SignatureDocument = Signature & mongoose.Document;

@Schema()
export class Signature{
    @ApiProperty()
    @Prop()
    status : boolean;
    @ApiProperty()
    @Prop({ default: false })
    pagamento_pendente : boolean;
    @ApiProperty()
    @Prop()
    id_pagamento : string;
    @ApiProperty()
    @Prop()
    ultima_assinatura: Date;
    @ApiProperty()
    @Prop()
    data_expiracao: Date;
    @ApiProperty()
    @Prop()
    card_token: string;
    @ApiProperty({type: User})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' })
    id_usuario: User | string;

}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
SignatureSchema.set('timestamps', {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });