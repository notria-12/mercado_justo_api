import * as mongoose from 'mongoose';
export declare const orientacao: readonly ["masculino", "feminino", "outros"];
export declare type Orientacao = typeof orientacao[number];
export declare const uf: readonly ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];
export declare type UF = typeof uf[number];
export declare const tipoConta: readonly ["admin", "operador", "gerente", "cliente"];
export declare type TipoConta = typeof tipoConta[number];
export declare const permissoes: readonly ["imagens", "precos", "usuarios", "produtos", "mercados", "edicao_textos_app", "gerenciamento_dados"];
export declare type Permissoes = typeof permissoes[number];
export declare type UserDocument = User & mongoose.Document;
export declare class Address {
    rua: string;
    numero: string;
    complemento?: string;
    bairro?: string;
    cidade: string;
    uf: UF;
    cep: string;
}
export declare class User {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    orientacao: Orientacao;
    idade: number;
    endereco: Address;
    data_cadastro: Date;
    status_assinante: boolean;
    data_assinatura?: Date;
    data_assinatura_cancelada?: Date;
    ultimo_acesso?: Date;
    compartilhamentos: number;
    senha?: string;
    responsavel_mercados: number[];
    tipo_conta: TipoConta;
    permissoes: Permissoes[];
    google_id: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
