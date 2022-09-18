import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentsService{
    
    async geraChavePix(){
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken('TEST-3113315594089042-091721-f0b0377226f4d3fa5d398affa6d34355-305744408');

        var payment_data = {
            transaction_amount: 100,
            description: 'Título do produto',
            payment_method_id: 'pix',
            payer: {
              email: 'airton.araujo.s18@gmail.com',
              first_name: 'Test',
              last_name: 'User',
              identification: {
                  type: 'CPF',
                  number: '19119119100'
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
         return {'qr_code': data['body']['point_of_interaction']['transaction_data']['qr_code']};
    }
}