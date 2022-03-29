import { Controller, Get, Param, Query } from '@nestjs/common';
import { AccessService } from './access.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, PaginationDto, FindAllSearchDto, ApiController } from 'src/common';
import { Access } from 'src/schema';

@ApiController('Acessos', [Access])
@Controller('acessos')
export class AccessController {
  constructor(private readonly accessService: AccessService) { }

  @ApiOkResponse(ApiResSchema.applyArr(Access))
  @Public()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.accessService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(Access))
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(id);
  }
}
