import { IsNotEmpty } from 'src/common';

export class ValidateTokenDto {
  @IsNotEmpty()
  access_token: string;
}