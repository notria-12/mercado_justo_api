import { TipoConta, Permissoes, User } from 'src/schema';
import { PickType } from '@nestjs/swagger';

export class UserPayload extends PickType(User,
  [
    'nome',
    'cpf',
    'email',
    'status_assinante',
    'tipo_conta',
    'permissoes',
    'responsavel_mercados'
  ] as const) {
  userId: string;
  
}