import { Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'src/common';

export class GetPriceDto {
  @IsNotEmpty()
  // @IsMongoId()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({value}) => value.split(','))
  productIds: string[];
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({value}) => value.split(','))
  marketIds: string[];
  
}