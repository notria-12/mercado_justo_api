import { IsNotEmpty, IsEmail, IsString } from 'src/common';

export class LoginGoogleDto {
  @IsNotEmpty()
  @IsString()
  google_id: string;
  @IsNotEmpty()
  @IsString()
  id_token: string;
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}