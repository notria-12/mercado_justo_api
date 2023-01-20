import * as mongoose from 'mongoose';
export declare type TermsUseDocument = TermsUse & mongoose.Document;
export declare class TermsUse {
    texto: string;
}
export declare const TermsUseSchema: mongoose.Schema<TermsUse, mongoose.Model<TermsUse, any, any, any, any>, {}, {}, {}, {}, "type", TermsUse>;
