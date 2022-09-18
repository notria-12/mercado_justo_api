import { Controller, Get } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller('assinaturas')
export class PaymentsController{
    constructor(private readonly paymentsService: PaymentsService){}

    @Get('pix')
   async geraChavePix(){
        return this.paymentsService.geraChavePix();
    }
}