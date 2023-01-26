/// <reference types="multer" />
import { Model } from 'mongoose';
import { ImageDocument, ProductDocument, SupermarketDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UpdateImageDto } from './dto';
export declare class ImagesService {
    private schemaModel;
    private productsModel;
    private supermarketsModel;
    private s3;
    private configService;
    constructor(schemaModel: Model<ImageDocument>, productsModel: Model<ProductDocument>, supermarketsModel: Model<SupermarketDocument>, s3: S3, configService: ConfigService);
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOneBySupermarketId(id: number): Promise<import("src/schema").Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneByBarcode(barcode: string): Promise<import("src/schema").Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateImageDto: UpdateImageDto): Promise<import("src/schema").Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    import(files: Express.Multer.File[]): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private uploadFile;
    private removeFile;
    private isBarcode;
    private getIdOrBarcodeFromName;
    private getS3Url;
    private getFileNameFromUrl;
    private filterObjectByKeys;
}
