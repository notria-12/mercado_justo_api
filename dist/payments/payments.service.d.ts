import { Model } from "mongoose";
import { SignatureDocument } from "src/schema/signature.schema";
import { CreatePixDto } from "./dtos/create-pix.dto";
import { CreatePreferenceDto } from "./dtos/create-preference.dto";
import { CreateSignatureDto } from "./dtos/create-signature.dto";
import { CreateCardDto } from "./dtos/create-card.dto";
import { UserDocument } from "src/schema";
export declare class PaymentsService {
    private signatureModel;
    private userModel;
    constructor(signatureModel: Model<SignatureDocument>, userModel: Model<UserDocument>);
    notificaPamento(data: any): Promise<any>;
    capturePayment(id: string): Promise<any>;
    buscaAssinaturaCIELO(id: string): Promise<any>;
    cancelSingnature(id: string): Promise<any>;
    updateSignature(createCard: CreateCardDto): Promise<any>;
    deleteCard(id: string): Promise<any>;
    getCardBrand(cardNumber: string): string;
    createSignature(createSignature: CreateSignatureDto): Promise<void>;
    saveCard(createCard: CreateCardDto): Promise<any>;
    getPaymentInfo(user_id: string): Promise<any>;
    getCardInfo(user_id: string): Promise<any>;
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
