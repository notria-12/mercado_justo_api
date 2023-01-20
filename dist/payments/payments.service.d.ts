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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { SignatureDocument } from "src/schema/signature.schema";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { CreatePreferenceDto } from "./dtos/create-preference.dto";
export declare class PaymentsService {
    private signatureModel;
    constructor(signatureModel: Model<SignatureDocument>);
    geraChavePix(createPixDto: CreatePixDto): Promise<{
        qr_code: any;
        id_pix: any;
        status: any;
        payer: any;
    }>;
    buscaAssinatura(id: string): Promise<import("src/schema/signature.schema").Signature & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    buscaDiasRestantes(id: string): Promise<{
        dias_restantes: number;
    }>;
    buscaPreferencia(createPreference: CreatePreferenceDto): Promise<{
        id: any;
    }>;
}
