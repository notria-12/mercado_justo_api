import { AccessService } from './access.service';
import { PaginationDto, FindAllSearchDto } from 'src/common';
import { Access } from 'src/schema';
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessService);
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Access & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
