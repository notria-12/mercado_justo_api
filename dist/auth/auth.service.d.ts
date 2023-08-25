import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schema';
import { ConfigService } from '@nestjs/config';
import { LoginGoogleDto } from './dto';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { NewPasswordDto, RecoverPasswordDto } from 'src/mail/dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginPhoneDto } from './dto/login-phone.dto';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { SendEmailTokenDto } from 'src/mail/dto/send-email-token.dto';
import { ReceiveTokenDto } from 'src/mail/dto/receive-token.dto';
import { SendSmsTokenDto } from 'src/mail/dto/send-sms-token.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private mailService;
    private tokenService;
    private eventEmitter;
    private firebaseStrategy;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, mailService: MailService, tokenService: TokenService, eventEmitter: EventEmitter2, firebaseStrategy: FirebaseAuthStrategy);
    validateUser(cpf: string, pass: string): Promise<any>;
    login(user: UserDocument): Promise<{
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
    private generateToken;
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
    sendEmailToken(email: SendEmailTokenDto): Promise<{
        mensagem: string;
    }>;
    verifyPhoneNumber(telefone: SendSmsTokenDto): Promise<{
        mensagem: string;
    }>;
    private verifyFirebaseToken;
    private verifyIdToken;
    private createOrUpdateUser;
    validateExternal(access_token: string): boolean;
    sendRecoverPassword(recoverPassword: RecoverPasswordDto): Promise<{
        mensagem: string;
        detalhe?: undefined;
    } | {
        mensagem: string;
        detalhe: string;
    }>;
    confirmRecoverPassword(newPassword: NewPasswordDto): Promise<{}>;
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
}
