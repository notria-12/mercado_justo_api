import { Product } from "src/schema";
import { PublicProductsService } from "./public-products.service";
export declare class PublicProductsController {
    private readonly productModelsService;
    constructor(productModelsService: PublicProductsService);
    findPublicsProducts(): Promise<(Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
