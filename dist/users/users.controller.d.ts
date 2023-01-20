/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto, ImportQueryDto, UpdateUserDto, CreateUserAppDto } from './dto';
import { PaginationDto, FindAllSearchDto } from 'src/common';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    createAPP(createUserDto: CreateUserAppDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findMe(): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    getList(): Promise<any[]>;
    findByCpfExternal(cpf: string): Promise<any>;
    findOne(id: string): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    remove(id: string): Promise<{}>;
    import(file: Express.Multer.File, query: ImportQueryDto): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
