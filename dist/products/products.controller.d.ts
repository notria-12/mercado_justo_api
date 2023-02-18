/// <reference types="multer" />
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { Product } from 'src/schema';
export declare class ProductsController {
    private readonly productModelsService;
    constructor(productModelsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    getList(): Promise<any[]>;
    findOne(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByCategory(id: string, pagination: PaginationDto): Promise<(Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    remove(id: string): Promise<{}>;
    import(file: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
