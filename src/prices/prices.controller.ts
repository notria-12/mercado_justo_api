import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto, UpdatePriceDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, PaginationDto, FindAllSearchDto, ApiController, ApiFile, BulkRemoveDto } from 'src/common';
import { Price } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiController('Preços', [Price])
@Controller('precos')
export class PricesController {
  constructor(private readonly pricesService: PricesService) { }

  @ApiCreatedResponse(ApiResSchema.apply(Price))
  @Roles(Role.Operador, Role.Gerente)
  @Permissions(Permission.Precos)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @ApiOkResponse(ApiResSchema.applyArr(Price))
  @Public()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.pricesService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.applyArr(Price))
  @Public()
  @Get('some')
  findSpecificsPrices() {
    return this.pricesService.findSpecificPrices('6254b2f17c0cb961c84d2341', 17);
  }

  @ApiOkResponse(ApiResSchema.apply(Price))
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricesService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.apply(Price))
  @Roles(Role.Operador, Role.Gerente)
  @Permissions(Permission.Precos)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador, Role.Gerente)
  @Permissions(Permission.Precos)
  @ApiBearerAuth()
  @Delete('bulk-remove')
  bulkRemove(@Body() bulkRemoveDto: BulkRemoveDto) {
    return this.pricesService.bulkRemove(bulkRemoveDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador, Role.Gerente)
  @Permissions(Permission.Precos)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }

  @Roles(Role.Operador, Role.Gerente)
  @Permissions(Permission.Precos)
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  @Post('importar')
  import(@UploadedFile() file: Express.Multer.File) {
    return this.pricesService.import(file);
  }
}
