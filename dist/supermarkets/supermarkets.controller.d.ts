/// <reference types="multer" />
import { SupermarketsService } from './supermarkets.service';
import { CreateSupermarketDto, UpdateSupermarketDto } from './dto';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { Supermarket } from 'src/schema';
export declare class SupermarketsController {
    private readonly supermarketsService;
    constructor(supermarketsService: SupermarketsService);
    create(createSupermarketDto: CreateSupermarketDto): Promise<Omit<Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    getList(query: PaginationDto & FindAllSearchDto): Promise<any[]>;
    findOne(id: string): Promise<Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateSupermarketDto: UpdateSupermarketDto): Promise<Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    remove(id: string): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
