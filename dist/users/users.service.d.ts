/// <reference types="multer" />
import { CreateUserAppDto, CreateUserDto, ImportQueryDto, UpdateUserDto } from './dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto } from 'src/common';
import { LoginGoogleDto } from 'src/auth/dto';
import { ClsService } from 'nestjs-cls';
import { UsersImport } from './users.import';
import { SignatureDocument } from 'src/schema/signature.schema';
export declare class UsersService {
    private schemaModel;
    private signatureModel;
    private clsService;
    private usersImport;
    constructor(schemaModel: Model<UserDocument>, signatureModel: Model<SignatureDocument>, clsService: ClsService, usersImport: UsersImport);
    createApp(createUserDto: CreateUserAppDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    createGoogle(createUser: LoginGoogleDto): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    findMe(): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    getList(): Promise<any[]>;
    findByEmailInternal(email: string): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByPhoneInternal(telefone: string): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByCPFInternal(cpf: string): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByEmailExternal(email: string): Promise<{
        _id: any;
    }>;
    findByCpfExternal(cpf: string): Promise<{
        _id: any;
    }>;
    findOneByGoogleData(google_id: string, email: string): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
        _id: unknown;
    }>;
    updatePasswordByEmail(email: string, password: string): Promise<import("mongodb").UpdateResult>;
    updateLastAccess(id: string): Promise<import("src/schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    import(file: Express.Multer.File, query: ImportQueryDto): Promise<{
        erros: {};
        sucessos: {};
    }>;
    getPlataformData(): Promise<any>;
}
