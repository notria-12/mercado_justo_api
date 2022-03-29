import { IsEmail, IsNotEmpty } from 'src/common';

export class RecoverPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
