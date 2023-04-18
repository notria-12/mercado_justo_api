import { GetPriceDto } from "src/prices/dto";
import { PublicPricesService } from "./public-prices.service";
export declare class PublicPricesController {
    private readonly pricesService;
    constructor(pricesService: PublicPricesService);
    findSpecificsPrices(query: GetPriceDto): Promise<any[]>;
}
