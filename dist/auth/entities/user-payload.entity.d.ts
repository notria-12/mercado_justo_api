import { User } from 'src/schema';
declare const UserPayload_base: import("@nestjs/common").Type<Pick<User, "nome" | "cpf" | "email" | "status_assinante" | "responsavel_mercados" | "tipo_conta" | "permissoes">>;
export declare class UserPayload extends UserPayload_base {
    userId: string;
}
export {};
