import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { CreatePreferenceDto } from "./dtos/create-preference.dto";
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
      return this.paymentsService.buscaAssinatura(id);
    }

    @Get('dias/:id')
    buscaDiasRestantes(@Param('id') id: string){
      return this.paymentsService.buscaDiasRestantes(id);
    }

    @Post('preferencias/')
    buscaPreferencia(@Body() createPreference: CreatePreferenceDto){
      return this.paymentsService.buscaPreferencia(createPreference);
    }
}