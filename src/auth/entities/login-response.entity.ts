import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  tipo_conta: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  usuario: UserResponse;
}