import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TermsUseService } from './terms-use.service';
import { CreateTermsUseDto, UpdateTermsUseDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, ApiController } from 'src/common';
import { TermsUse } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';

@ApiController('Termos de Uso', [TermsUse])
@Controller('termos-uso')
export class TermsUseController {
  constructor(private readonly termsUseService: TermsUseService) { }

  @ApiCreatedResponse(ApiResSchema.apply(TermsUse))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTermsUseDto: CreateTermsUseDto) {
    return this.termsUseService.create(createTermsUseDto);
  }

  @ApiOkResponse(ApiResSchema.apply(TermsUse))
  @Public()
  @Get()
  findOne() {
    return this.termsUseService.findOne();
  }

  @ApiOkResponse(ApiResSchema.apply(TermsUse))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Put()
  update(@Body() updateTermsUseDto: UpdateTermsUseDto) {
    return this.termsUseService.update(updateTermsUseDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Delete()
  remove() {
    return this.termsUseService.remove();
  }
}
