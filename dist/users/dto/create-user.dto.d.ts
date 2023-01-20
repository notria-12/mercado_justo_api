import { Orientacao, TipoConta, Permissoes, UF } from 'src/schema';
export declare class AddressDto {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: UF;
    cep: string;
}
export declare class CreateUserDto {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    orientacao: Orientacao;
    idade: number;
    senha: string;
    responsavel_mercados: number[];
    tipo_conta: TipoConta;
    permissoes: Permissoes[];
    google_id?: string;
    endereco?: AddressDto;
}
export declare class CreateUserAppDto {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    orientacao: Orientacao;
    idade: number;
    tipo_conta: TipoConta;
    permissoes: Permissoes[];
    google_id?: string;
    endereco?: AddressDto;
}
