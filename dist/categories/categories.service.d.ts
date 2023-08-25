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
