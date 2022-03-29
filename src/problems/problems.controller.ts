import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, NoAccessPlan, PaginationDto, FindAllSearchDto, ApiController, BulkRemoveDto } from 'src/common';
import { Problem } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';

@ApiController('Problemas', [Problem])
@NoAccessPlan()
@Controller('problemas')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) { }

  @ApiCreatedResponse(ApiResSchema.apply(Problem))
  @Public()
  @Post()
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.create(createProblemDto);
  }

  @ApiOkResponse(ApiResSchema.applyArr(Problem))
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.problemsService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(Problem))
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador)
  @Permissions(Permission.GerenciamentoDados)
  @ApiBearerAuth()
  @Delete('bulk-remove')
  bulkRemove(@Body() bulkRemoveDto: BulkRemoveDto) {
    return this.problemsService.bulkRemove(bulkRemoveDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador)
  @Permissions(Permission.GerenciamentoDados)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(id);
  }
}
