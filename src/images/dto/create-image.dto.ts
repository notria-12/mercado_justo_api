import { ValidateIf } from 'class-validator';
import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl } from 'src/common';
import { imageCategory, ImageCategory } from 'src/schema'

export class CreateImageDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
  @ValidateIf(o => typeof o.codigo_barras == 'undefined')
  @IsNumber()
  id: number;
  @ValidateIf(o => typeof o.id == 'undefined')
  @IsString()
  codigo_barras: string;
  @IsNotEmpty()
  @IsIn(imageCategory)
  categoria: ImageCategory;
}
