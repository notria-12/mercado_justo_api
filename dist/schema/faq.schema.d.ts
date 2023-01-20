import * as mongoose from 'mongoose';
export declare type FAQDocument = FAQ & mongoose.Document;
export declare class FAQ {
    pergunta: string;
    resposta: string;
}
export declare const FAQSchema: mongoose.Schema<FAQ, mongoose.Model<FAQ, any, any, any, any>, {}, {}, {}, {}, "type", FAQ>;
