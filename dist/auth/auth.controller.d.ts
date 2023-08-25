import { AuthService } from 'src/auth/auth.service';
import { ValidateTokenDto, LoginGoogleDto } from './dto';
import { RecoverPasswordDto, NewPasswordDto } from 'src/mail/dto';
import { LoginPhoneDto } from './dto/login-phone.dto';
import { SendEmailTokenDto } from 'src/mail/dto/send-email-token.dto';
import { ReceiveTokenDto } from 'src/mail/dto/receive-token.dto';
import { SendSmsTokenDto } from 'src/mail/dto/send-sms-token.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nome: string;
            email: string;
            telefone: string;
            orientacao: "masculino" | "feminino" | "outros";
            cpf: string;
            status_assinante: boolean;
            ultimo_acesso: Date;
            data_cadastro: Date;
            tipo_conta: "gerente" | "admin" | "operador" | "cliente";
            permissoes: ("precos" | "produtos" | "mercados" | "usuarios" | "imagens" | "edicao_textos_app" | "gerenciamento_dados")[];
            responsavel_mercados: number[];
        };
    }>;
    loginGoogle(loginGoogle: LoginGoogleDto): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nome: string;
            email: string;
            telefone: string;
            orientacao: "masculino" | "feminino" | "outros";
            cpf: string;
            status_assinante: boolean;
            ultimo_acesso: Date;
            data_cadastro: Date;
            tipo_conta: "gerente" | "admin" | "operador" | "cliente";
            permissoes: ("precos" | "produtos" | "mercados" | "usuarios" | "imagens" | "edicao_textos_app" | "gerenciamento_dados")[];
            responsavel_mercados: number[];
        };
    }>;
    loginPhone(loginPhone: LoginPhoneDto): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nome: string;
            email: string;
            telefone: string;
            orientacao: "masculino" | "feminino" | "outros";
            cpf: string;
            status_assinante: boolean;
            ultimo_acesso: Date;
            data_cadastro: Date;
            tipo_conta: "gerente" | "admin" | "operador" | "cliente";
            permissoes: ("precos" | "produtos" | "mercados" | "usuarios" | "imagens" | "edicao_textos_app" | "gerenciamento_dados")[];
            responsavel_mercados: number[];
        };
    }>;
    loginEmailToken(email: SendEmailTokenDto): Promise<{
        mensagem: string;
    }>;
    verifyPhoneNumber(telefone: SendSmsTokenDto): Promise<{
        mensagem: string;
    }>;
    confirmEmailToken(receiveToken: ReceiveTokenDto): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nome: string;
            email: string;
            telefone: string;
            orientacao: "masculino" | "feminino" | "outros";
            cpf: string;
            status_assinante: boolean;
            ultimo_acesso: Date;
            data_cadastro: Date;
            tipo_conta: "gerente" | "admin" | "operador" | "cliente";
            permissoes: ("precos" | "produtos" | "mercados" | "usuarios" | "imagens" | "edicao_textos_app" | "gerenciamento_dados")[];
            responsavel_mercados: number[];
        };
    }>;
    validate(validateTokenDto: ValidateTokenDto): boolean;
    confirmRecoverPassword(newPassword: NewPasswordDto): Promise<{}>;
    sendRecoverPassword(recoverPassword: RecoverPasswordDto): Promise<{
        mensagem: string;
        detalhe?: undefined;
    } | {
        mensagem: string;
        detalhe: string;
    }>;
}
