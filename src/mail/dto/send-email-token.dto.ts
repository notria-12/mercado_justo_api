import { IsEmail, IsNotEmpty } from 'src/common';

export class SendEmailTokenDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}