import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiResSchema, Public } from "src/common";
import { Product } from "src/schema";
import { PublicProductsService } from "./public-products.service";

@Controller('produtos-publicos')
export class PublicProductsController{
    constructor(private readonly productModelsService: PublicProductsService) { }

  @ApiOkResponse(ApiResSchema.applyArr(Product))
  @Public()
  @Get()
  findPublicsProducts(){
    return this.productModelsService.findPublicsProducts();
  }
}