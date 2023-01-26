import { Model } from "mongoose";
import { SupermarketDocument } from "src/schema";
export declare class PublicSupermarketsService {
    private schemaModel;
    constructor(schemaModel: Model<SupermarketDocument>);
    findPublicSupermarkets(): Promise<(import("src/schema").Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
