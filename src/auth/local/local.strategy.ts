import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'cpf',
      passwordField: 'senha' 
    });
  }

  async validate(cpf: string, senha: string): Promise<any> {
    const user = await this.authService.validateUser(cpf, senha);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException({
        mensagem: 'Não autorizado.',
        dados: {}
      });
    }
    console.log(user)
    return user;
  }
}