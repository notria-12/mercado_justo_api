import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto } from './dto';
import { PaginationDto, FindAllSearchDto } from 'src/common';
import { FAQ } from 'src/schema';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    create(createFaqDto: CreateFaqDto): Promise<FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(query: PaginationDto & FindAllSearchDto): Promise<{
        data: any;
        totalCount: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateFaqDto: UpdateFaqDto): Promise<FAQ & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{}>;
}
