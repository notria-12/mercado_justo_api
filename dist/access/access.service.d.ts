import { CreateAccessDto } from './dto';
import { Model } from 'mongoose';
import { AccessDocument } from 'src/schema';
import { AccessResponse } from './entities';
import { PaginationDto, FindAllSearchDto } from 'src/common';
export declare class AccessService {
    private schemaModel;
    constructor(schemaModel: Model<AccessDocument>);
    handleAccessEvents(payload: CreateAccessDto): Promise<void>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("src/schema").Access & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAccesses(): Promise<AccessResponse>;
}
