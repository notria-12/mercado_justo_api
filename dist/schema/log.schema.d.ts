import * as mongoose from 'mongoose';
import { User } from 'src/schema';
export declare type LogDocument = Log & mongoose.Document;
export declare const acao: readonly ["criar", "atualizar", "remover", "remover-muitos", "criar-muitos"];
export declare type Acao = typeof acao[number];
export declare class Log {
    acao: Acao;
    colecao: string;
    usuario: User | string;
    documento: string;
    data: Date;
    ip: string;
}
export declare const LogSchema: mongoose.Schema<Log, mongoose.Model<Log, any, any, any, any>, {}, {}, {}, {}, "type", Log>;
