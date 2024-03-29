import * as mongoose from 'mongoose';
import { User } from "./user.schema";
export declare const tipo: readonly ["card", "pix", "free"];
export declare type TipoAssinatura = typeof tipo[number];
export declare type SignatureDocument = Signature & mongoose.Document;
export declare class Signature {
    status: boolean;
    pagamento_pendente: boolean;
    id_pagamento: string;
    ultima_assinatura: Date;
    data_expiracao: Date;
    card_token: string;
    id_assinatura: string;
    tipo_pagamento: TipoAssinatura;
    id_usuario: User | string;
}
export declare const SignatureSchema: mongoose.Schema<Signature, mongoose.Model<Signature, any, any, any, any>, {}, {}, {}, {}, "type", Signature>;
