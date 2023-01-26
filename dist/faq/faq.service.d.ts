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
/// <reference types="mongoose/types/inferschematype" />
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
