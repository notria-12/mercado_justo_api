import { IsOptional } from 'class-validator';
import { IsMongoId, IsNotEmpty, IsString } from 'src/common';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsOptional()
  @IsMongoId()
  pai: string;
}
