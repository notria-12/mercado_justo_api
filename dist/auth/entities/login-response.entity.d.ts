declare class UserResponse {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    login: string;
    tipo_conta: string;
}
export declare class LoginResponse {
    access_token: string;
    usuario: UserResponse;
}
export {};
