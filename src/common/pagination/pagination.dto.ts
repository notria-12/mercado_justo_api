import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString, IsNumber } from 'src/common';

export class PaginationDto {
  @ApiProperty({
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  itens_pagina?: number;
  @ApiProperty({
    description: '1 desc; -1 asc; Ex.: campo, 1.',
  })
  @IsOptional()
  @IsString()
  ordernar?: string;
  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  pagina?: number;
}