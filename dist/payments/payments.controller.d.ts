import { CreateCardDto } from "./dtos/create-card.dto";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { CreatePreferenceDto } from "./dtos/create-preference.dto";
import { CreateSignatureDto } from "./dtos/create-signature.dto";
import { PaymentsService } from "./payments.service";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    geraChavePix(createPixDto: CreatePixDto): Promise<{
        qr_code: any;
        id_pix: any;
        status: any;
        payer: any;
    }>;
    buscaAssinatura(id: string): Promise<import("../schema/signature.schema").Signature & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    buscaDiasRestantes(id: string): Promise<{
        dias_restantes: number;
    }>;
    criaAssinatura(createSignature: CreateSignatureDto): Promise<any>;
    notificaPagamento(data: any): Promise<any>;
    buscaPlano(id: string): Promise<any>;
    criaCartao(createCard: CreateCardDto): Promise<any>;
    buscaCartao(id: string): Promise<any>;
    buscaFatura(id: string): Promise<any>;
    buscaPreferencia(createPreference: CreatePreferenceDto): Promise<{
        id: any;
    }>;
}
