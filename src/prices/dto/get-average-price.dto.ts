import { Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import {IsNotEmpty, IsString,  } from 'src/common';

export class GetAveragePriceDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  productId: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({value}) => value.split(','))
  marketIds: string[];
  
}