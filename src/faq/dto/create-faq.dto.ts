import { IsNotEmpty, IsString } from 'src/common';

export class CreateFaqDto {
  @IsNotEmpty()
  @IsString()
  pergunta: string;
  @IsNotEmpty()
  @IsString()
  resposta: string;
}
