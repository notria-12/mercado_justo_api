import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiResSchema, Public } from "src/common";
import { GetPriceDto } from "src/prices/dto";
import { Price } from "src/schema";
import { PublicPricesService } from "./public-prices.service";

@Controller('precos-publicos')
export class PublicPricesController{
    constructor(private readonly pricesService: PublicPricesService) { }

  @ApiOkResponse(ApiResSchema.applyArr(Price))
  @Public()
  @Get()
  findSpecificsPrices(@Query() query: GetPriceDto) {
    return this.pricesService.findSpecificPrices(query.productIds, query.marketIds.map((value,index) => Number(value)));
  }

}