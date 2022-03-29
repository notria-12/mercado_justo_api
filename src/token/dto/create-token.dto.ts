import { IsMongoId, IsNotEmpty, IsIn } from 'src/common';
import { tipoToken, TipoToken } from 'src/schema';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsMongoId()
  email: string;
  @IsNotEmpty()
  @IsIn(tipoToken)
  tipo: TipoToken;
}
