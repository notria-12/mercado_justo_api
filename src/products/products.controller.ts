import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, PaginationDto, FindAllSearchDto, ApiController, GetListModel, ApiFile, BulkRemoveDto, Public } from 'src/common';
import { Product } from 'src/schema';
import { Roles, Role } from 'src/auth/roles';
import { Permissions, Permission } from 'src/auth/permissions';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetProductsDto } from './dto/get-products.dto';

@ApiController('Produtos', [Product], true)
@Roles(Role.Operador)
@Permissions(Permission.Produtos)
@Controller('produtos')
export class ProductsController {
  constructor(private readonly productModelsService: ProductsService) { }

  @ApiCreatedResponse(ApiResSchema.apply(Product))
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productModelsService.create(createProductDto);
  }

  @ApiOkResponse(ApiResSchema.applyArr(Product))
  @Roles(Role.Operador, Role.Gerente, Role.Cliente)
  @Permissions(Permission.Produtos, Permission.Precos)
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.productModelsService.findAll(query);
  }
  
  

  @ApiOkResponse(ApiResSchema.applyArr(GetListModel))
  @Get('listar')
  getList() {
    return this.productModelsService.getList();
  }

  @ApiOkResponse(ApiResSchema.apply(Product))
  @Roles(Role.Operador, Role.Gerente, Role.Cliente)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productModelsService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.apply(Product))
  @Roles(Role.Operador, Role.Gerente, Role.Cliente)
  @Permissions(Permission.Produtos, Permission.Precos)
  @Get('/category/:id')
  findByCategory(@Param('id') id: string, @Query()  pagination: PaginationDto) {
    return this.productModelsService.findByCategory(id, pagination);
  }

  @ApiOkResponse(ApiResSchema.apply(Product))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productModelsService.update(id, updateProductDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Delete('bulk-remove')
  bulkRemove(@Body() bulkRemoveDto: BulkRemoveDto) {
    return this.productModelsService.bulkRemove(bulkRemoveDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productModelsService.remove(id);
  }

  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  @Post('importar')
  import(@UploadedFile() file: Express.Multer.File) {
    return this.productModelsService.import(file);
  }
}
