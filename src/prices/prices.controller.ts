import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto, UpdatePriceDto, GetPriceDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, PaginationDto, FindAllSearchDto, ApiController, ApiFile, BulkRemoveDto } from 'src/common';
import { Price } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAveragePriceDto } from './dto/get-average-price.dto';

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
  @Roles(Role.Operador, Role.Gerente, Role.Cliente)
  @Permissions(Permission.Produtos, Permission.Precos)
  @Get('specifics-prices')
  findSpecificsPrices(@Query() query: GetPriceDto) {
    return this.pricesService.findSpecificPrices(query.productIds, query.marketIds.map((value,index) => Number(value)));
  }

  @ApiOkResponse(ApiResSchema.applyArr(Price))
  @Public()
  @Get('preco-medio')
  getAveragePrice(@Query() query: GetAveragePriceDto) {
    return this.pricesService.getAveragePrice(query.productId, query.marketIds.map((value,index) => Number(value)));
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
