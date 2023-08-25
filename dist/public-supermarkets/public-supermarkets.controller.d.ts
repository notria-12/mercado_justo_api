import { Supermarket } from "src/schema";
import { PublicSupermarketsService } from "./public-supermarkets.service";
export declare class PublicSupermarketsController {
    private readonly supermarketsService;
    constructor(supermarketsService: PublicSupermarketsService);
    findPublicSupermarkets(): Promise<(Supermarket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
