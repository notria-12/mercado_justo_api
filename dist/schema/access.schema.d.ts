import * as mongoose from 'mongoose';
import { User } from 'src/schema';
export declare type AccessDocument = Access & mongoose.Document;
export declare class Access {
    colecao: string;
    usuario: User | string;
    documento: string;
    data_hora: Date;
}
export declare const AccessSchema: mongoose.Schema<Access, mongoose.Model<Access, any, any, any, any>, {}, {}, {}, {}, "type", Access>;
