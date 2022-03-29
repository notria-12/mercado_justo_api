import { Controller, Get, Param, Query, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResSchema, PaginationDto, FindAllSearchDto, ApiController } from 'src/common';
import { Log } from 'src/schema';
import { Roles, Role } from 'src/auth/roles';

@ApiController('Logs', [Log], true)
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) { }

  @ApiOkResponse(ApiResSchema.applyArr(Log))
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.logService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(Log))
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(id);
  }
}
