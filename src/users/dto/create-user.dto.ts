import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsEmail, IsPhoneNumber, IsIn, Min, IsString,
  IsNumber, IsCPF, MinLength, IsArray, IsCEP, IsMongoId
} from 'src/common';
import {
  orientacao, Orientacao, tipoConta, TipoConta,
  permissoes, Permissoes, uf, UF
} from 'src/schema';

export class AddressDto {
  @IsOptional()
  @IsString()
  rua: string;
  @IsOptional()
  @IsString()
  numero: string;
  @IsOptional()
  @IsString()
  complemento: string;
  @IsOptional()
  @IsString()
  bairro: string;
  @IsNotEmpty()
  @IsString()
  cidade: string;
  @ApiProperty({ enum: uf })
  @IsNotEmpty()
  @IsIn(uf)
  uf: UF;
  @IsOptional()
  @IsCEP()
  cep: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsCPF()
  cpf: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ValidateIf(o => !o.tipo_conta || o.tipo_conta != 'gerente')
  @IsPhoneNumber('BR')
  telefone: string;
  @ApiProperty({ enum: orientacao })
  @IsOptional()
  @IsIn(orientacao)
  orientacao: Orientacao;
  @IsOptional()
  @IsNumber()
  @Min(18)
  idade: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  senha: string;
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  responsavel_mercados: number[];
  @ApiProperty({ enum: tipoConta })
  @IsOptional()
  @IsIn(tipoConta)
  tipo_conta: TipoConta;
  @ApiProperty({ enum: [permissoes] })
  @IsOptional()
  @IsArray()
  @IsIn(permissoes, { each: true })
  permissoes: Permissoes[];
  @IsOptional()
  @IsString()
  google_id?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  endereco?: AddressDto;
}

export class CreateUserAppDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsCPF()
  cpf: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ValidateIf(o => !o.tipo_conta || o.tipo_conta != 'gerente')
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;
  @ApiProperty({ enum: orientacao })
  @IsOptional()
  @IsIn(orientacao)
  orientacao: Orientacao;
  @IsOptional()
  @IsNumber()
  @Min(18)
  idade: number;
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(8)
  // senha: string;
  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // responsavel_mercados: number[];
  @ApiProperty({ enum: tipoConta })
  @IsOptional()
  @IsIn(tipoConta)
  tipo_conta: TipoConta;
  @ApiProperty({ enum: [permissoes] })
  @IsOptional()
  @IsArray()
  @IsIn(permissoes, { each: true })
  permissoes: Permissoes[];
  @IsOptional()
  @IsString()
  google_id?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  endereco?: AddressDto;
  @IsString()
  @IsOptional()
  invitedBy: string;
}
