import { IsBoolean, IsOptional } from 'class-validator';
import { IsString, IsUrl, IsNotEmpty, IsCNPJ, IsNumber, IsPhoneNumber, IsIn } from 'src/common';
import { UF, uf } from 'src/schema';

export class CreateSupermarketDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsUrl({ require_protocol: true })
  site: string;
  @IsOptional()
  @IsCNPJ()
  cnpj: string;
  @IsNotEmpty()
  @IsNumber()
  latitude: number;
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone: string;
  @IsOptional()
  @IsString()
  endereco: string
  @IsOptional()
  @IsString()
  cidade: string;
  @IsOptional()
  @IsIn(uf)
  uf: UF;
  @IsOptional()
  @IsNumber()
  ordem: number;
  @IsOptional()
  @IsBoolean()
  visivel: boolean;
}
