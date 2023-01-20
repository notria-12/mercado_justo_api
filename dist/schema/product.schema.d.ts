import * as mongoose from 'mongoose';
import { UF } from '.';
export declare const unidade: readonly ["gr", "kg", "unid"];
export declare type Unidade = typeof unidade[number];
export declare type ProductDocument = Product & mongoose.Document;
export declare class Product {
    descricao: string;
    codigo_barras: string[];
    categoria_1: string;
    categoria_2: string;
    categoria_3: string;
    unidade: Unidade;
    cidade: string;
    uf: UF;
    ordem?: number;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, "type", Product>;
