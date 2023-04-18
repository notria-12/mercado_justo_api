import * as mongoose from 'mongoose';
import { UF } from '.';
export declare type SupermarketDocument = Supermarket & mongoose.Document;
export declare class Supermarket {
    nome: string;
    id: number;
    site: string;
    cnpj: string;
    latitude: number;
    longitude: number;
    telefone: string;
    endereco: string;
    cidade: string;
    uf: UF;
    ordem?: number;
    visivel: boolean;
}
export declare const SupermarketSchema: mongoose.Schema<Supermarket, mongoose.Model<Supermarket, any, any, any, any>, {}, {}, {}, {}, "type", Supermarket>;
