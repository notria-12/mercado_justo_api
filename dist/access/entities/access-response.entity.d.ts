import { PriceDocument } from 'src/schema';
declare class Access {
    mes: number;
    ano: number;
    total: number;
}
declare class ProductsAccess {
    acessos: Access[];
    produto: PriceDocument;
}
export declare class AccessResponse {
    usuarios: Access[];
    produtos: ProductsAccess[];
}
export {};
