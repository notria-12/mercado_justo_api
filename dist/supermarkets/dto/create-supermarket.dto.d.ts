import { UF } from 'src/schema';
export declare class CreateSupermarketDto {
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
    ordem: number;
    visivel: boolean;
}
