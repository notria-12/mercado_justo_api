import { IsNotEmpty, IsIn } from 'src/common';
import { tipoConta, TipoConta } from 'src/schema';

export class ImportQueryDto {
  @IsNotEmpty()
  @IsIn(tipoConta)
  tipo_conta: TipoConta;
}