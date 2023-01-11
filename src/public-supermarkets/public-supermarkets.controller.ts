import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiResSchema, Public } from "src/common";
import { Supermarket } from "src/schema";
import { PublicSupermarketsService } from "./public-supermarkets.service";

@Controller('mercados-publicos')
export class PublicSupermarketsController{
    constructor(private readonly supermarketsService: PublicSupermarketsService) { }


  @ApiOkResponse(ApiResSchema.applyArr(Supermarket))
  @Public()
  @Get()
  findPublicSupermarkets() {
    return this.supermarketsService.findPublicSupermarkets();
  }
}