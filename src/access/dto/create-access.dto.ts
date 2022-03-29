import { IsOptional } from 'class-validator';
import { IsMongoId, IsNotEmpty, IsString } from 'src/common';

export class CreateAccessDto {
  @IsNotEmpty()
  @IsString()
  colecao: string;
  @IsOptional()
  @IsMongoId()
  usuario: string;
  @IsNotEmpty()
  @IsMongoId()
  documento: string;
}
