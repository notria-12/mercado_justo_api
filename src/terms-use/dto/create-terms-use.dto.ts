import { IsNotEmpty, IsString } from 'src/common';

export class CreateTermsUseDto {
  @IsNotEmpty()
  @IsString()
  texto: string;
}
