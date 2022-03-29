import { IsIn, IsNotEmpty, IsString } from 'src/common';
import { tipoProblema, TipoProblema } from 'src/schema';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  codigo_barras: string;
  @IsNotEmpty()
  @IsIn(tipoProblema)
  tipo: TipoProblema;
}
