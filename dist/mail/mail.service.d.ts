import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { RecoverPasswordDto } from './dto';
import { SendEmailTokenDto } from './dto/send-email-token.dto';
export declare class MailService {
    private mailerService;
    private usersService;
    private tokenService;
    constructor(mailerService: MailerService, usersService: UsersService, tokenService: TokenService);
    sendRecoverPassword(recoverPassword: RecoverPasswordDto): Promise<{
        mensagem: string;
        detalhe?: undefined;
    } | {
        mensagem: string;
        detalhe: string;
    }>;
    sendEmailToken(sendEmailToken: SendEmailTokenDto): Promise<{
        mensagem: string;
    }>;
}
