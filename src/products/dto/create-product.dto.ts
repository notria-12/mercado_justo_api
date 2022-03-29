import { IsOptional, ValidateIf } from 'class-validator';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'src/common';
import { UF, uf, Unidade, unidade } from 'src/schema';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;
  @IsNotEmpty()
  @IsString({ each: true })
  codigo_barras: string[];
  @IsNotEmpty()
  @IsString()
  categoria_1: string;
  @IsOptional()
  @IsString()
  categoria_2: string;
  @IsOptional()
  @IsString()
  categoria_3: string;
  @IsOptional()
  @IsIn(unidade)
  unidade: Unidade;
  @ValidateIf(o => !!o.uf)
  @IsString()
  cidade: string;
  @IsOptional()
  @IsIn(uf)
  uf: UF;
  @IsOptional()
  @IsNumber()
  ordem: number;
}
