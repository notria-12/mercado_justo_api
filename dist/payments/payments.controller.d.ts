/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
    atualizaAssinatura(createCard: CreateCardDto): Promise<any>;
    cancelaAssinatura(id: string): Promise<any>;
    buscaDiasRestantes(id: string): Promise<{
        dias_restantes: number;
    }>;
    criaAssinatura(createSignature: CreateSignatureDto): Promise<any>;
    notificaPagamento(data: any): Promise<any>;
    buscaPlano(id: string): Promise<any>;
    criaCartao(createCard: CreateCardDto): Promise<any>;
    buscaCartao(id: string): Promise<any>;
    deletaCartao(id: string): Promise<any>;
    buscaFatura(id: string): Promise<any>;
    buscaPreferencia(createPreference: CreatePreferenceDto): Promise<{
        id: any;
    }>;
}
