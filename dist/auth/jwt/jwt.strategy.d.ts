import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        cpf: any;
        email: any;
        status_assinante: any;
        tipo_conta: any;
        permissoes: any;
        responsavel_mercados: any;
    }>;
}
export {};
