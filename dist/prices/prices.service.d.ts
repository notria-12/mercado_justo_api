/// <reference types="multer" />
import { CreatePriceDto, UpdatePriceDto } from './dto';
import mongoose, { Model } from 'mongoose';
import { Price, PriceDocument, ProductDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { ClsService } from 'nestjs-cls';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PricesImport } from './prices.import';
export declare class PricesService {
    private schemaModel;
    private productsModel;
    private clsService;
    private eventEmitter;
    private pricesImport;
    constructor(schemaModel: Model<PriceDocument>, productsModel: Model<ProductDocument>, clsService: ClsService, eventEmitter: EventEmitter2, pricesImport: PricesImport);
    create(createPriceDto: CreatePriceDto): Promise<Omit<Price & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Price & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findSpecificPrices(productIds: string[], marketsIds: number[]): Promise<any[]>;
    getAveragePrice(productId: string, marketsIds: number[]): Promise<{
        'preco-medio': number;
    }>;
    update(id: string, updatePriceDto: UpdatePriceDto): Promise<Price & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private getPrefilter;
    private userHasAccessToId;
}
