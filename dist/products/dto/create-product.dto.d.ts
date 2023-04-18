import { UF, Unidade } from 'src/schema';
export declare class CreateProductDto {
    descricao: string;
    codigo_barras: string[];
    categoria_1: string;
    categoria_2: string;
    categoria_3: string;
    unidade: Unidade;
    cidade: string;
    uf: UF;
    ordem: number;
}
