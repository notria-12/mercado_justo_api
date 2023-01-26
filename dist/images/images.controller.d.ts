/// <reference types="multer" />
import { ImagesService } from './images.service';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { Image } from 'src/schema';
import { UpdateImageDto } from './dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOneBySupermarketId(id: string): Promise<Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneByBarcode(barcode: string): Promise<Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateImageDto: UpdateImageDto): Promise<Image & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    remove(id: string): Promise<{}>;
    import(files: Express.Multer.File[]): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
