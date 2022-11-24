import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResSchema, PaginationDto, FindAllSearchDto, ApiController, GetListModel, Public } from 'src/common';
import { Category } from 'src/schema';
import { Roles, Role } from 'src/auth/roles';

@ApiController('Categorias', [Category])
@Controller('categorias')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @ApiCreatedResponse(ApiResSchema.apply(Category))
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @ApiCreatedResponse(ApiResSchema.applyArr(Category))
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.categoriesService.findAll(query);
  }

  @Public()
  @ApiCreatedResponse(ApiResSchema.applyArr(Category))
  @ApiBearerAuth()
  @Get('/geral')
  findMainCatergories() {
    return this.categoriesService.findMainCatergories();
  }

  @Public()
  @ApiCreatedResponse(ApiResSchema.applyArr(Category))
  @ApiBearerAuth()
  @Get('/geral/:id')
  findSecondaryCatergories(@Param('id') id: string) {
    return this.categoriesService.findSecondaryCatergories(id);
  }

  @Public()
  @ApiCreatedResponse(ApiResSchema.apply(Category))
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiCreatedResponse(ApiResSchema.apply(Category))
  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }


  @ApiOkResponse(ApiResSchema.applyType('object'))
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
