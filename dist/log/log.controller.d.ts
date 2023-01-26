import { LogService } from './log.service';
import { PaginationDto, FindAllSearchDto } from 'src/common';
import { Log } from 'src/schema';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
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
