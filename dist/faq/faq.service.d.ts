import { CreateFaqDto, UpdateFaqDto } from './dto';
import { Model } from 'mongoose';
import { FAQDocument } from 'src/schema';
import { FindAllSearchDto, PaginationDto } from 'src/common';
export declare class FaqService {
    private schemaModel;
    constructor(schemaModel: Model<FAQDocument>);
    create(createFaqDto: CreateFaqDto): Promise<import("src/schema").FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("src/schema").FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateFaqDto: UpdateFaqDto): Promise<import("src/schema").FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
}
