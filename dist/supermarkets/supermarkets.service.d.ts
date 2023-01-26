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
import { CreateSupermarketDto, UpdateSupermarketDto } from './dto';
import { Model } from 'mongoose';
import { SupermarketDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { SupermarketsImport } from './supermarkets.import';
import { ClsService } from 'nestjs-cls';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class SupermarketsService {
    private schemaModel;
    private clsService;
    private eventEmitter;
    private supermarketsImport;
    constructor(schemaModel: Model<SupermarketDocument>, clsService: ClsService, eventEmitter: EventEmitter2, supermarketsImport: SupermarketsImport);
    create(createSupermarketDto: CreateSupermarketDto): Promise<Omit<import("src/schema").Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("src/schema").Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getList(query: PaginationDto & FindAllSearchDto): Promise<any[]>;
    update(id: string, updateSupermarketDto: UpdateSupermarketDto): Promise<import("src/schema").Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private getPrefilter;
    private isSupermarketPosAvailable;
}
