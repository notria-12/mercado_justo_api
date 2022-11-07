
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { RecoverPasswordDto } from './dto';
import {join} from 'path';
import { template } from 'handlebars';
import { SendEmailTokenDto } from './dto/send-email-token.dto';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService,
    private tokenService: TokenService,
  ) { }

  async sendRecoverPassword(recoverPassword: RecoverPasswordDto) {
    const user = await this.usersService.findByEmailInternal(recoverPassword.email);

    if (user) {
      const tokenString = await this.tokenService.create({
        email: user.email,
        tipo: 'recuperar-senha'
      });

      if (tokenString) {
        const url = `https://mercadojustoapp.com.br/recuperar-senha?email=${user.email}&token=${tokenString}`
        this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Esqueceu sua senha? Mercado Justo',
          template: 'recover-password',
          context: {
            name: user.nome,
            url: url,
            token: tokenString
          },
        });

        return {'mensagem': 'Token enviado com sucesso'};
      }
    }
    return {'mensagem': 'Erro ao enviar token', 'detalhe': 'email não cadastrado'};

    
  }

  async sendEmailToken(sendEmailToken: SendEmailTokenDto) {
    const user = await this.usersService.findByEmailInternal(sendEmailToken.email);

    if (user) {
      const tokenString = await this.tokenService.create({
        email: user.email,
        tipo: 'login-email'
      });

      if (tokenString) {
        // const url = `https://mercadojustoapp.com.br/recuperar-senha?email=${user.email}&token=${tokenString}`
        this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Código de login - Mercado Justo',
          template: 'login-token',
          context: {
            name: user.nome,
            
            token: tokenString
          },
        });

        return {'mensagem': 'Token enviado com sucesso'};
      }
    }

    throw new NotFoundException({
      mensagem: 'E-mail não cadastrado.',

      dados: {}
    });
  }
}
