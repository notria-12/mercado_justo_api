import { CreateTermsUseDto, UpdateTermsUseDto } from './dto';
import { Model } from 'mongoose';
import { TermsUseDocument } from 'src/schema';
export declare class TermsUseService {
    private schemaModel;
    constructor(schemaModel: Model<TermsUseDocument>);
    create(createTermsUseDto: CreateTermsUseDto): Promise<import("src/schema").TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(): Promise<import("src/schema").TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(updateTermsUseDto: UpdateTermsUseDto): Promise<import("src/schema").TermsUse & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(): Promise<{}>;
}
