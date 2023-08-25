import { TermsUseService } from './terms-use.service';
import { CreateTermsUseDto, UpdateTermsUseDto } from './dto';
import { TermsUse } from 'src/schema';
export declare class TermsUseController {
    private readonly termsUseService;
    constructor(termsUseService: TermsUseService);
    create(createTermsUseDto: CreateTermsUseDto): Promise<TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(): Promise<TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(updateTermsUseDto: UpdateTermsUseDto): Promise<TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(): Promise<{}>;
}
