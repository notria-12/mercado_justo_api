import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { FindAllSearchDto } from 'src/common';
export declare function findAllWithPaginationSearch(model: Model<any>, query: FindAllSearchDto, select?: string, populate?: PopulateOptions | string, preFilter?: FilterQuery<any>): Promise<{
    data: any;
    totalCount: number;
    totalPages: number;
}>;
export declare function listByKey(model: Model<any>, query: FindAllSearchDto, key: string, select?: string, populate?: PopulateOptions | string): Promise<any[]>;
export declare function generateSearchObject(rawSearch: FindAllSearchDto): {};
export declare function tryToParse(value: any): any;
