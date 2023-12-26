import { Model } from "mongoose";
import { ProductDocument } from "src/schema";
export declare class PublicProductsService {
    private schemaModel;
    constructor(schemaModel: Model<ProductDocument>);
    findPublicsProducts(): Promise<(import("src/schema").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
