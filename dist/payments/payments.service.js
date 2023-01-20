"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const signature_schema_1 = require("../schema/signature.schema");
let PaymentsService = class PaymentsService {
    constructor(signatureModel) {
        this.signatureModel = signatureModel;
    }
    async geraChavePix(createPixDto) {
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
        const exists = await this.signatureModel.findOne({ id_usuario: createPixDto.id });
        let data;
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
                address: {
                    zip_code: '06233200',
                    street_name: 'Av. das Nações Unidas',
                    street_number: '3003',
                    neighborhood: 'Bonfim',
                    city: 'Osasco',
                    federal_unit: 'SP'
                }
            }
        };
        if (exists) {
            if (exists['pagamento_pendente']) {
                data = await mercadopago.payment.findById(exists['id_pagamento']);
            }
            else {
                data = await mercadopago.payment.create(payment_data);
                await this.signatureModel.updateOne({ id_usuario: createPixDto.id }, { id_pagamento: data['body']['id'] });
            }
        }
        else {
            data = await mercadopago.payment.create(payment_data);
            const createSignature = new this.signatureModel({ id_pagamento: data['body']['id'], status: false, data_expiracao: null, ultima_assinatura: null, id_usuario: createPixDto.id });
            createSignature.save();
        }
        return { 'qr_code': data['body']['point_of_interaction']['transaction_data']['qr_code'], 'id_pix': data['body']['id'], 'status': data['body']['status'], 'payer': data['body']['payer'] };
    }
    async buscaAssinatura(id) {
        console.log('ASSINATURA');
        var mercadopago = require('mercadopago');
        console.log('import');
        console.log(process.env.MERCADO_PAGO_TOKEN);
        mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
        console.log('access token');
        let signature = await this.signatureModel.findOne({ id_usuario: id });
        console.log(`assinatua: ${signature}`);
        if (signature) {
            if (signature['id_pagamento'] != '') {
                console.log('Id não vazio');
                var data = await mercadopago.payment.findById(signature['id_pagamento']);
                console.log(data);
                if (data['body']['status'] == 'pending' && (signature['pagamento_pendente'] == undefined || signature['pagamento_pendente'] == false)) {
                    await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { pagamento_pendente: true });
                    signature = await this.signatureModel.findOne({ id_usuario: id });
                }
                else if ((data['body']['status'] == 'cancelled' || data['body']['status'] == 'rejected') && (signature['pagamento_pendente'] == true)) {
                    await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { pagamento_pendente: false });
                    signature = await this.signatureModel.findOne({ id_usuario: id });
                }
                else if (data['body']['status'] == 'approved') {
                    var date_approved = new Date(data['body']['date_approved']);
                    var daysSinceApproved = (Date.now() - date_approved.getTime()) / (1000 * 60 * 60 * 24);
                    var remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                    if ((daysSinceApproved > 0 && daysSinceApproved <= 30) && !signature['status']) {
                        console.log('Mudou assinatura para true');
                        await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { pagamento_pendente: false, status: true, ultima_assinatura: date_approved, data_expiracao: date_approved.getTime() + (1000 * 60 * 60 * 24 * 30) });
                        signature = await this.signatureModel.findOne({ id_usuario: id });
                    }
                    else if (remainingDays < 0 && signature['status']) {
                        console.log('Mudou assinatura para false');
                        await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                        signature = await this.signatureModel.findOne({ id_usuario: id });
                    }
                }
            }
            else {
                console.log('Id  vazio');
                if ((new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24) < 0 && signature['status']) {
                    console.log('Mudou assinatura para false');
                    await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                    signature = await this.signatureModel.findOne({ id_usuario: id });
                }
            }
            return signature;
        }
        else {
            throw new common_1.NotFoundException({ mensagem: "Usuário não tem uma assinatura vigente", codigo: "not_found_signature" });
        }
    }
    async buscaDiasRestantes(id) {
        let signature = (await this.signatureModel.findOne({ id_usuario: id }));
        if (signature != undefined && signature['status']) {
            var remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
            return { "dias_restantes": remainingDays };
        }
        else {
            throw new common_1.NotFoundException({ mensagem: "Usuário não tem uma assinatura vigente", codigo: "not_found_signature" });
        }
    }
    async buscaPreferencia(createPreference) {
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
        var preference = {};
        var item = {
            title: 'Assinatura MJ',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 0.1
        };
        var payer = {
            email: createPreference.email
        };
        preference['items'] = [item];
        preference['payer'] = payer;
        var newPreference = await mercadopago.preferences.create(preference);
        console.log(newPreference);
        return { 'id': newPreference['body']['id'] };
    }
};
PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('assinaturas')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map