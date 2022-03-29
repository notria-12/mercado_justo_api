import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'src/common';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsMongoId()
  produto: string;
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  preco: string;
}
