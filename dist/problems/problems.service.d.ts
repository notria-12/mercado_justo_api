import { CreateProblemDto } from './dto';
import { Model } from 'mongoose';
import { ProblemDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { ClsService } from 'nestjs-cls';
export declare class ProblemsService {
    private schemaModel;
    private clsService;
    constructor(schemaModel: Model<ProblemDocument>, clsService: ClsService);
    create(createProblemDto: CreateProblemDto): Promise<import("src/schema").Problem & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("src/schema").Problem & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
}
