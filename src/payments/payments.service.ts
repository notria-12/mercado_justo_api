import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { createCrypto } from "google-auth-library/build/src/crypto/crypto";
import { isEqual } from "lodash";
import { Model } from "mongoose";
import { SignatureDocument } from "src/schema/signature.schema";
import { CreatePixDto } from "./dtos/create-pix.dto";

@Injectable()
export class PaymentsService{
    constructor(@InjectModel('assinaturas') private signatureModel: Model<SignatureDocument>){}

    async geraChavePix(createPixDto : CreatePixDto){
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken('APP_USR-3113315594089042-091721-98faf9315355c2b44fd4cc3d055b0b1e-305744408');
         
        
        var payment_data = {
            transaction_amount: 0.10,
            description: 'Título do produto',
            payment_method_id: 'pix',
            payer: {
              email: createPixDto.email,
              first_name: createPixDto.nome.split(" ")[0],
              last_name: createPixDto.nome.split(" ")[1],
              identification: {
                  type: 'CPF',
                  number: createPixDto.cpf
              },
              address:  {
                  zip_code: '06233200',
                  street_name: 'Av. das Nações Unidas',
                  street_number: '3003',
                  neighborhood: 'Bonfim',
                  city: 'Osasco',
                  federal_unit: 'SP'
              }
            }
          };
          
         var data = await mercadopago.payment.create(payment_data);
         console.log(data)
         const createSignature = new this.signatureModel({id_pagamento: data['body']['id'], status: false, data_expiracao:  Date.now(), ultima_assinatura: Date.now(), id_usuario: '62507ce88cd39f71730d3ea5'});
         createSignature.save();
         return {'qr_code': data['body']['point_of_interaction']['transaction_data']['qr_code'], 'id_pix': data['body']['id'], 'status': data['body']['status'], 'payer': data['body']['payer']};
    }

    async findOne(id: string) {
        const signature = (await this.signatureModel.find( {id_usuario:  id}));
        return signature;
      }
}