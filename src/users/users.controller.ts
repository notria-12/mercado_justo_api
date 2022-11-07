import { Controller, Get, Post, Body, Put, Param, Query, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ImportQueryDto, UpdateUserDto, CreateUserAppDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiResSchema, Public, PaginationDto, FindAllSearchDto, ApiController, ApiFile } from 'src/common';
import { User } from 'src/schema';
import { Role, Roles } from 'src/auth/roles';
import { Permission, Permissions } from 'src/auth/permissions';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiController('Usuários', [User])
@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiCreatedResponse(ApiResSchema.apply(User))
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiCreatedResponse(ApiResSchema.apply(User))
  @Public()
  @Post('app')
  createAPP(@Body() createUserDto: CreateUserAppDto) {
    return this.usersService.createApp(createUserDto);
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Usuarios)
  @ApiOkResponse(ApiResSchema.applyArr(User))
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: PaginationDto & FindAllSearchDto) {
    return this.usersService.findAll(query);
  }

  @ApiOkResponse(ApiResSchema.apply(User))
  @ApiBearerAuth()
  @Get('eu')
  findMe() {
    return this.usersService.findMe();
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Usuarios, Permission.Mercados)
  @ApiOkResponse(ApiResSchema.applyArr(User))
  @ApiBearerAuth()
  @Get('listar')
  getList() {
    return this.usersService.getList();
  }

  // @ApiOkResponse(ApiResSchema.applyType('boolean'))
  // @Public()
  // @Get('email/:email')
  // findByEmailExternal(@Param('email') email: string): Promise<boolean> {
  //   return this.usersService.findByEmailExternal(email);
  // }

  // @ApiOkResponse(ApiResSchema.applyType('boolean'))
  @Public()
  @Get('cpf/:cpf')
  findByCpfExternal(@Param('cpf') cpf: string): Promise<any> {
    return this.usersService.findByCpfExternal(cpf);
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Usuarios)
  @ApiOkResponse(ApiResSchema.apply(User))
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse(ApiResSchema.apply(User))
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse(ApiResSchema.applyType('object'))
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Roles(Role.Admin, Role.Operador)
  @Permissions(Permission.Usuarios)
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  @Post('importar')
  import(@UploadedFile() file: Express.Multer.File, @Query() query: ImportQueryDto) {
    return this.usersService.import(file, query);
  }
}
