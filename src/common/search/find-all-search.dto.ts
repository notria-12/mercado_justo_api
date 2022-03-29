import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { IsNotEmpty, IsString } from 'src/common';
import { PaginationDto } from '../pagination';

export class SearchObj {
  @IsNotEmpty()
  @IsString()
  termo: string;
  @IsNotEmpty()
  valor: any;
  @IsOptional()
  @IsBoolean()
  estrito: boolean;
  @IsNotEmpty()
  @IsString()
  tipo: 'string' | 'number' | 'date' | 'boolean' | 'objectId';
  @IsOptional()
  @IsBoolean()
  multi: boolean;
}

export class FindAllSearchDto extends PaginationDto {
  @ApiProperty({
    type: [String],
    isArray: true,
    description: 'Filtra através dos campos. Ex.: campo,valor'
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SearchObj)
  procurar?: SearchObj[];
}