import { Injectable, NotFoundException } from "@nestjs/common";
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
         
         const exists = await this.signatureModel.findOne({id_usuario: createPixDto.id})
         console.log(exists)
         if(exists){
            await this.signatureModel.updateOne({id_usuario: createPixDto.id}, {id_pagamento:  data['body']['id']});
           
         }else{
            const createSignature = new this.signatureModel({id_pagamento: data['body']['id'], status: false, data_expiracao:  null, ultima_assinatura: null, id_usuario: createPixDto.id});
            createSignature.save();
         }
         
         return {'qr_code': data['body']['point_of_interaction']['transaction_data']['qr_code'], 'id_pix': data['body']['id'], 'status': data['body']['status'], 'payer': data['body']['payer']};
    }

    async buscaAssinatura(id: string) {
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken('APP_USR-3113315594089042-091721-98faf9315355c2b44fd4cc3d055b0b1e-305744408');  
        let signature = (await this.signatureModel.findOne( {id_usuario:  id}));
    
        if(signature){
             var data = await mercadopago.payment.findById(signature['id_pagamento']);
             console.log(data);
            if(data['body']['status'] == 'pending' && (signature['pagamento_pendente'] == undefined || signature['pagamento_pendente'] == false)){
                await this.signatureModel.updateOne({id_usuario: signature['id_usuario']}, {pagamento_pendente:  true});
                signature = await this.signatureModel.findOne( {id_usuario:  id});
            }
            else if((data['body']['status'] == 'cancelled' || data['body']['status'] == 'rejected') && (signature['pagamento_pendente'] == true)){
                await this.signatureModel.updateOne({id_usuario: signature['id_usuario']}, {pagamento_pendente:  false});
                signature = await this.signatureModel.findOne( {id_usuario:  id}); 
            }else if(data['body']['status'] == 'approved'){
                var date_approved = new Date(data['body']['date_approved']);
                var daysSinceApproved = (Date.now() - date_approved.getTime()) / (1000 * 60 * 60 * 24);
                var remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                
                if((daysSinceApproved => 0 && daysSinceApproved <= 30) && !signature['status'] ){
                    await this.signatureModel.updateOne({id_usuario: signature['id_usuario']}, {pagamento_pendente:  false, status: true, ultima_assinatura: date_approved, data_expiracao: date_approved.getTime() + (1000 * 60 * 60 * 24*30)});
                    signature = await this.signatureModel.findOne( {id_usuario:  id}); 
                }else if(remainingDays < 0 && signature['status']){
                    await this.signatureModel.updateOne({id_usuario: signature['id_usuario']}, {status:  false});
                    signature = await this.signatureModel.findOne( {id_usuario:  id}); 
                }
            }

            return signature;        
        }else{
            throw new NotFoundException({mensagem: "Usuário não tem uma assinatura vigente", codigo: "not_found_signature"})
        }
      }

      async  buscaDiasRestantes(id: string) {
        let signature = (await this.signatureModel.findOne( {id_usuario:  id}));
        console.log(signature);
        if(signature){
            var remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return {"dias_restantes": remainingDays};
        }else{
            throw new NotFoundException({mensagem: "Usuário não tem uma assinatura vigente", codigo: "not_found_signature"});
        }
      }
}