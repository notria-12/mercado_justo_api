/// <reference types="multer" />
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
