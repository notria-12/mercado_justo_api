/// <reference types="multer" />
import { CreateProductDto, UpdateProductDto } from './dto';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { ProductsImport } from './products.import';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClsService } from 'nestjs-cls/dist/src/lib/cls.service';
export declare class ProductsService {
    private schemaModel;
    private eventEmitter;
    private clsService;
    private productsImport;
    constructor(schemaModel: Model<ProductDocument>, eventEmitter: EventEmitter2, clsService: ClsService, productsImport: ProductsImport);
    create(createProductDto: CreateProductDto): Promise<import("src/schema").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("src/schema").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByCategory(category: string): Promise<(import("src/schema").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getList(): Promise<any[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("src/schema").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private isProductPosAvailable;
}
