import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub,
      cpf: payload.cpf, 
      email: payload.email, 
      status_assinante: payload.status_assinante,
      tipo_conta: payload.tipo_conta,
      permissoes: payload.permissoes,
      responsavel_mercados: payload.responsavel_mercados
    };
  }
}