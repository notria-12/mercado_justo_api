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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PricesService } from './prices.service';
import { CreatePriceDto, UpdatePriceDto, GetPriceDto } from './dto';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { Price } from 'src/schema';
import { GetAveragePriceDto } from './dto/get-average-price.dto';
export declare class PricesController {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    create(createPriceDto: CreatePriceDto): Promise<Omit<Price & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findSpecificsPrices(query: GetPriceDto): Promise<any[]>;
    getAveragePrice(query: GetAveragePriceDto): Promise<{
        'preco-medio': number;
    }>;
    findOne(id: string): Promise<Price & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updatePriceDto: UpdatePriceDto): Promise<Price & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    remove(id: string): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
