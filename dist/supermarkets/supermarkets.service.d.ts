/// <reference types="multer" />
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
