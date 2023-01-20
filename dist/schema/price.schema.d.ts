import * as mongoose from 'mongoose';
import { Product } from 'src/schema';
export declare type PriceDocument = Price & mongoose.Document;
export declare class Price {
    constructor(id: any, produto: any, preco: any);
    produto: Product | string;
    id: number;
    preco: string;
}
export declare const PriceSchema: mongoose.Schema<Price, mongoose.Model<Price, any, any, any, any>, {}, {}, {}, {}, "type", Price>;
