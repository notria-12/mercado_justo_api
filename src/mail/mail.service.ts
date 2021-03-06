import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { RecoverPasswordDto } from './dto';

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
          template: './recover-password',
          context: {
            name: user.nome,
            url: url,
            token: tokenString
          },
        });
      }
    }

    return {};
  }
}
