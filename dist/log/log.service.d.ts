import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto } from 'src/common';
export declare class LogService {
    private schemaModel;
    constructor(schemaModel: Model<LogDocument>);
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Log & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
}
