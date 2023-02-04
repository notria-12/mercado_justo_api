/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
