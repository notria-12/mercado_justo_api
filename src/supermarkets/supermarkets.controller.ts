import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { CreateSupermarketDto, UpdateSupermarketDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, NoAccessPlan, PaginationDto, FindAllSearchDto, ApiController, ApiFile, BulkRemoveDto, GetListModel } from 'src/common';
import { Supermarket } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiController('Supermercados', [Supermarket])
@NoAccessPlan()
@Controller('mercados')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) { }

  @ApiCreatedResponse(ApiResSchema.apply(Supermarket))
  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Mercados)
  @ApiBearerAuth()
  @Post()
  create(@Body() createSupermarketDto: CreateSupermarketDto) {
    return this.supermarketsService.create(createSupermarketDto);
  }

  @ApiOkResponse(ApiResSchema.applyArr(Supermarket))
  @Public()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.supermarketsService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.applyArr(GetListModel))
  @Get('listar')
  getList(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.supermarketsService.getList(query);
  }

  @ApiOkResponse(ApiResSchema.apply(Supermarket))
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermarketsService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.apply(Supermarket))
  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Mercados)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupermarketDto: UpdateSupermarketDto) {
    return this.supermarketsService.update(id, updateSupermarketDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Mercados)
  @ApiBearerAuth()
  @Delete('bulk-remove')
  bulkRemove(@Body() bulkRemoveDto: BulkRemoveDto) {
    return this.supermarketsService.bulkRemove(bulkRemoveDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Mercados)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supermarketsService.remove(id);
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Mercados)
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  @Post('importar')
  import(@UploadedFile() file: Express.Multer.File) {
    return this.supermarketsService.import(file);
  }
}
