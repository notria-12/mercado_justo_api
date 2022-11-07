import { IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from "class-validator";
import { IsCPF, IsEmail } from "src/common";

export class CreatePixDto{
    @IsNotEmpty()
    @IsString()
    id: string;
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

}