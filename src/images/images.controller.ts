import { Controller, Get, Post, Param, Delete, Query, UseInterceptors, UploadedFiles, Body, Put } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import { ApiResSchema, Public, NoAccessPlan, PaginationDto, FindAllSearchDto, ApiController, BulkRemoveDto } from 'src/common';
import { Image } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateImageDto } from './dto';

@ApiController('Imagens', [Image])
@NoAccessPlan()
@Controller('imagens')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @ApiOkResponse(ApiResSchema.applyArr(Image))
  @Public()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.imagesService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(Image))
  @Public()
  @Get('logo/:id')
  findOneBySupermarketId(@Param('id') id: string) {
    return this.imagesService.findOneBySupermarketId(+id);
  }

  @ApiOkResponse(ApiResSchema.apply(Image))
  @Public()
  @Get('produto/:barcode')
  findOneByBarcode(@Param('barcode') barcode: string) {
    return this.imagesService.findOneByBarcode(barcode);
  }

  @ApiOkResponse(ApiResSchema.apply(Image))
  @Roles(Role.Operador)
  @Permissions(Permission.Imagens)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador)
  @Permissions(Permission.Imagens)
  @ApiBearerAuth()
  @Delete('bulk-remove')
  bulkRemove(@Body() bulkRemoveDto: BulkRemoveDto) {
    return this.imagesService.bulkRemove(bulkRemoveDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Imagens)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Imagens)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @Post('importar')
  import(@UploadedFiles() files: Express.Multer.File[]) {
    return this.imagesService.import(files);
  }
}
