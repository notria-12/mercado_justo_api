import { IsEmail, IsNotEmpty, IsString,  } from 'src/common';

export class ReceiveTokenDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  token: string;
  
}