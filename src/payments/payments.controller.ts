import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Public } from "src/common";
import { CreateCardDto } from "./dtos/create-card.dto";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { CreatePreferenceDto } from "./dtos/create-preference.dto";
import { CreateSignatureDto } from "./dtos/create-signature.dto";
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
    @Put()
    atualizaAssinatura(@Body() createCard: CreateCardDto) {
      return this.paymentsService.updateSignature(createCard);
    }
    @Put('/credit-card/:id')
    cancelaAssinatura(@Param('id') id: string) {
      return this.paymentsService.cancelSingnature(id);
    }
    

    @Get('dias/:id')
    buscaDiasRestantes(@Param('id') id: string){
      return this.paymentsService.buscaDiasRestantes(id);
    }

    @Post()
    criaAssinatura(@Body() createSignature: CreateSignatureDto){
    
      return this.paymentsService.createSignature(createSignature);
    }

    @Post('pagamento/')
    @Public()
    notificaPagamento(@Body() data: any){
      return this.paymentsService.notificaPamento(data)
    }

    @Get('plano/:id')
    buscaPlano(@Param('id') id: string){
      return this.paymentsService.buscaAssinaturaCIELO(id);
    }

    @Post('card/')
    criaCartao(@Body() createCard: CreateCardDto){
      
      return this.paymentsService.saveCard(createCard);
    }

    @Get('card/:id')
    buscaCartao(@Param('id') id: string){
      return this.paymentsService.getPaymentInfo(id);
    }
    @Delete('card/:id')
    deletaCartao(@Param('id') id: string){
      return this.paymentsService.deleteCard(id);
    }

    @Get('fatura/:id')
    buscaFatura(@Param('id') id: string){
      return this.paymentsService.buscaAssinaturaCIELO(id);
    }

    @Post('preferencias/')
    buscaPreferencia(@Body() createPreference: CreatePreferenceDto){
      return this.paymentsService.buscaPreferencia(createPreference);
    }
}