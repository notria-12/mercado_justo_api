import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, ApiController, PaginationDto, FindAllSearchDto } from 'src/common';
import { FAQ } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';

@ApiController('Perguntas Frequentes', [FAQ])
@Controller('perguntas-frequentes')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }

  @ApiCreatedResponse(ApiResSchema.apply(FAQ))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @ApiOkResponse(ApiResSchema.applyArr(FAQ))
  @Public()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.faqService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(FAQ))
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.apply(FAQ))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Operador)
  @Permissions(Permission.EdicaoTextosApp)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
