import { IsString } from 'class-validator';
import { IsEmail, IsNotEmpty } from 'src/common';

export class SendSmsTokenDto {
  @IsNotEmpty()
  @IsString()
  telefone: string;
}