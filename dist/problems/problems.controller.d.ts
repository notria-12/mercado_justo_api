import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto';
import { PaginationDto, FindAllSearchDto, BulkRemoveDto } from 'src/common';
import { Problem } from 'src/schema';
export declare class ProblemsController {
    private readonly problemsService;
    constructor(problemsService: ProblemsService);
    create(createProblemDto: CreateProblemDto): Promise<Problem & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Problem & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    bulkRemove(bulkRemoveDto: BulkRemoveDto): Promise<{}>;
    remove(id: string): Promise<{}>;
}
