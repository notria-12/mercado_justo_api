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
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Model } from 'mongoose';
import { CategoryDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto } from 'src/common';
import { Types } from 'mongoose';
export declare class CategoriesService {
    private schemaModel;
    constructor(schemaModel: Model<CategoryDocument>);
    create(createCategoryDto: CreateCategoryDto): Promise<import("src/schema").Category & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findMainCatergories(): Promise<(import("src/schema").Category & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    findSecondaryCatergories(id: String): Promise<(import("src/schema").Category & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("src/schema").Category & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("src/schema").Category & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
}
