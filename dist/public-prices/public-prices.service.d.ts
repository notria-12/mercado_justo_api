import { Model } from "mongoose";
import { PriceDocument } from "src/schema";
export declare class PublicPricesService {
    private schemaModel;
    constructor(schemaModel: Model<PriceDocument>);
    findSpecificPrices(productIds: string[], marketsIds: number[]): Promise<any[]>;
}
