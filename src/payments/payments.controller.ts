import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { PaymentsService } from "./payments.service";

@Controller('assinaturas')
export class PaymentsController{
    constructor(private readonly paymentsService: PaymentsService){}

   @Post('pix')
   async geraChavePix(@Body() createPixDto : CreatePixDto){
        return this.paymentsService.geraChavePix(createPixDto);
    }

    @Get(':id')
    buscaAssinatura(@Param('id') id: string) {
      return this.paymentsService.findOne(id);
    }
}