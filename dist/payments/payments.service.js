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
const axios_1 = require("axios");
const mongoose_2 = require("mongoose");
const signature_schema_1 = require("../schema/signature.schema");
const schema_1 = require("../schema");
let PaymentsService = class PaymentsService {
    constructor(signatureModel, userModel) {
        this.signatureModel = signatureModel;
        this.userModel = userModel;
    }
    async notificaPamento(data) {
        try {
            console.log(data);
            if (data['entity'] == 'preapproval') {
                let signatureId = data['data']['id'];
                let signatureMP = await this.buscaAssinaturaMP(signatureId);
                if (data['action'] == 'updated') {
                    const signature = await this.signatureModel.findOne({ id_assinatura: signatureId });
                    console.log(signature);
                    if (signatureMP['response']['status'] == "authorized") {
                        console.log('status == authorized');
                        console.log('mudou assinatura pra true');
                        await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: true });
                        await this.signatureModel.updateOne({ id_assinatura: signatureId }, { tipo_pagamento: signature_schema_1.tipo[0], status: true, data_expiracao: signatureMP['response']['next_payment_date'], ultima_assinatura: signatureMP['response']['last_modified'] });
                    }
                    else {
                        console.log('status == ', signatureMP['response']['status']);
                        if (signature['status']) {
                            let remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                            if (remainingDays < 0) {
                                console.log('mudou assinatura pra false');
                                await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: false });
                                await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                            }
                        }
                    }
                }
                if (data['action'] == 'created') {
                    await this.signatureModel.updateOne({ id_usuario: signatureMP['response']['external_reference'] }, { status: true, data_expiracao: new Date(signatureMP['response']['last_modified']).getTime() + (1000 * 60 * 60 * 24 * 7), ultima_assinatura: signatureMP['response']['last_modified'], id_assinatura: signatureId });
                }
            }
            if (data['entity'] == 'authorized_payment') {
                let paymentResult = await this.capturePayment(data['data']['id']);
                let signatureId = paymentResult['preapproval_id'];
                const signature = await this.signatureModel.findOne({ id_assinatura: signatureId });
                if (paymentResult['status'] == 'scheduled') {
                    console.log('mudou assinatura pra true');
                    await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: true });
                    await this.signatureModel.updateOne({ id_assinatura: signatureId }, { tipo_pagamento: signature_schema_1.tipo[0], status: true, data_expiracao: paymentResult['debit_date'], ultima_assinatura: paymentResult['last_modified'], pagamento_pendente: false });
                }
                if (paymentResult['status'] == 'processed') {
                    console.log('mudou assinatura pra true');
                    await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: true });
                    await this.signatureModel.updateOne({ id_assinatura: signatureId }, { tipo_pagamento: signature_schema_1.tipo[0], status: true, data_expiracao: paymentResult['expire_date'], ultima_assinatura: paymentResult['last_modified'], pagamento_pendente: false });
                }
                if (paymentResult['status'] == 'recycling') {
                    if (signature['status']) {
                        let remainingDays = (new Date(paymentResult['debit_date']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                        if (remainingDays < 0) {
                            console.log('mudou assinatura pra false');
                            await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: false });
                            await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false, pagamento_pendente: true, id_pagamento: data['data']['id'], tipo_pagamento: signature_schema_1.tipo[0], data_expiracao: paymentResult['debit_date'] });
                        }
                    }
                }
                if (paymentResult['status'] == 'cancelled') {
                    if (signature['status'] || signature['pagamento_pendente']) {
                        let remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                        if (remainingDays < 0) {
                            console.log('mudou assinatura pra false');
                            await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: false });
                            await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false, pagamento_pendente: false });
                        }
                    }
                }
            }
        }
        catch (e) {
            return e;
        }
    }
    async capturePayment(id) {
        try {
            const response = await axios_1.default.get(`https://api.mercadopago.com/authorized_payments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`
                }
            });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
    async buscaAssinaturaMP(id) {
        try {
            var mercadopago = require('mercadopago');
            mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
            var responsePlan = await mercadopago.preapproval.findById(id);
            console.log(responsePlan['response']);
            return responsePlan;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async cancelSingnature(id) {
        try {
            var mercadopago = require('mercadopago');
            mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
            var cancelResponse = await mercadopago.preapproval.cancel(id);
            if (cancelResponse['response']['status'] == "cancelled") {
                await this.signatureModel.updateOne({ id_assinatura: id }, { pagamento_pendente: false, card_token: '', tipo_pagamento: signature_schema_1.tipo[2] });
            }
            return cancelResponse;
        }
        catch (error) {
            return error;
        }
    }
    async updateSignature(createCard) {
        try {
            var mercadopago = require('mercadopago');
            mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
            const user = await this.userModel.findById(createCard.user_id);
            if (user) {
                const signature = await this.signatureModel.findOne({ id_usuario: createCard.user_id });
                if (signature) {
                    var old_card = signature['card_token'];
                    let card = await this.saveCard(createCard);
                    if (card['status'] == 'active') {
                        const plan = {
                            id: signature['id_assinatura'],
                            card_token_id: card['id'],
                        };
                        var responsePlan = await mercadopago.preapproval.update(plan);
                        return responsePlan['response'];
                    }
                    else {
                        return new common_1.UnauthorizedException(card);
                    }
                }
                else {
                    throw new common_1.NotFoundException({ mensagem: "Usuário não tem assinatura vigente", codigo: "not_found_signature" });
                }
            }
            else {
                throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
            }
        }
        catch (e) {
            await this.signatureModel.updateOne({ id_usuario: createCard.user_id }, { card_token: old_card });
            throw new common_1.UnauthorizedException(e);
        }
    }
    async deleteCard(id) {
        try {
            var mercadopago = require('mercadopago');
            mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
            const user = await this.userModel.findById(id);
            if (user) {
                const signature = await this.signatureModel.findOne({ id_usuario: id });
                var result = await mercadopago.card_token.delete(signature['card_token']);
                await this.signatureModel.updateOne({ id_usuario: id }, { card_token: '' });
            }
            else {
                throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
            }
        }
        catch (e) {
            return e;
        }
    }
    async createSignature(createSignature) {
        try {
            var mercadopago = require('mercadopago');
            mercadopago.configure({ access_token: process.env.MERCADO_PAGO_TOKEN, client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET });
            const user = await this.userModel.findById(createSignature.id_usuario);
            if (user) {
                var card = await this.saveCard(createSignature.card);
                console.log('Card status: ', card);
                if (card['status'] == 'active') {
                    const plan = {
                        "auto_recurring": {
                            "frequency": 1,
                            "frequency_type": "months",
                            "currency_id": "BRL",
                            "transaction_amount": 1
                        },
                        'card_token_id': card['id'],
                        'status': 'authorized',
                        'payer_email': createSignature.email,
                        'back_url': 'https://mercadojusto.com.br',
                        'reason': 'Assinatura APP MJ',
                        'external_reference': createSignature.id_usuario
                    };
                    console.log("BEFORE");
                    var responsePlan = await mercadopago.preapproval.create(plan);
                    console.log("RESPONSE::::", responsePlan.data);
                    if (!(responsePlan.data['status'] >= 200 && responsePlan.data['status'] <= 299)) {
                        throw new common_1.UnauthorizedException();
                    }
                    return responsePlan['response'];
                }
                else {
                    return new common_1.UnauthorizedException(card);
                }
            }
            else {
                throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException(e);
        }
    }
    async saveCard(createCard) {
        var mercadopago = require('mercadopago');
        mercadopago.configure({ access_token: process.env.MERCADO_PAGO_TOKEN, client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET });
        const user = await this.userModel.findById(createCard.user_id);
        if (user) {
            try {
                const signature = await this.signatureModel.findOne({ id_usuario: createCard.user_id });
                var cardInfo = {
                    "card_number": createCard.card_number,
                    "expiration_month": createCard.expiration_month,
                    "expiration_year": createCard.expiration_year,
                    "security_code": createCard.security_code,
                    "cardholder": {
                        "name": createCard.holder_name,
                        "identification": {
                            "type": "CPF",
                            "number": createCard.cpf
                        }
                    }
                };
                var result = await mercadopago.card_token.save(cardInfo);
                var token = result['response']['id'];
                if (signature) {
                    await this.signatureModel.updateOne({ id_usuario: createCard.user_id }, { card_token: token, tipo_pagamento: signature_schema_1.tipo[0] });
                }
                else {
                    const createSignature = new this.signatureModel({ id_pagamento: '', status: false, data_expiracao: null, ultima_assinatura: null, id_usuario: createCard.user_id, card_token: token, tipo_pagamento: signature_schema_1.tipo[0] });
                    createSignature.save();
                }
                return result['response'];
            }
            catch (e) {
                return e;
            }
        }
        else {
            throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
        }
    }
    async getCardInfo(user_id) {
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
        const user = await this.userModel.findById(user_id);
        if (user) {
            const signature = await this.signatureModel.findOne({ id_usuario: user_id });
            if (signature) {
                if (signature['card_token']) {
                    var result = await mercadopago.card_token.findById(signature['card_token']);
                    return result['response'];
                }
                else {
                    throw new common_1.NotFoundException({ mensagem: "Cartão não encontrado", codigo: "not_found_card" });
                }
            }
            else {
                throw new common_1.NotFoundException({ mensagem: "Usuário não tem assinatura vigente", codigo: "not_found_signature" });
            }
        }
        else {
            throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
        }
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
            if (exists['pagamento_pendente'] && exists['tipo_pagamento'] != signature_schema_1.tipo[0]) {
                data = await mercadopago.payment.findById(exists['id_pagamento']);
            }
            else {
                data = await mercadopago.payment.create(payment_data);
                await this.signatureModel.updateOne({ id_usuario: createPixDto.id }, { id_pagamento: data['body']['id'], tipo_pagamento: signature_schema_1.tipo[1] });
            }
        }
        else {
            data = await mercadopago.payment.create(payment_data);
            const createSignature = new this.signatureModel({ id_pagamento: data['body']['id'], status: false, data_expiracao: null, ultima_assinatura: null, id_usuario: createPixDto.id, tipo_pagamento: signature_schema_1.tipo[1] });
            createSignature.save();
        }
        return { 'qr_code': data['body']['point_of_interaction']['transaction_data']['qr_code'], 'id_pix': data['body']['id'], 'status': data['body']['status'], 'payer': data['body']['payer'] };
    }
    async buscaAssinatura(id) {
        var mercadopago = require('mercadopago');
        mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
        let signature = await this.signatureModel.findOne({ id_usuario: id });
        if (signature) {
            if (signature['tipo_pagamento'] != signature_schema_1.tipo[0]) {
                if (signature['id_pagamento'] != '' && signature['tipo_pagamento'] == signature_schema_1.tipo[1]) {
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
                            await this.userModel.findByIdAndUpdate(id, { status_assinante: true });
                            await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { pagamento_pendente: false, status: true, ultima_assinatura: date_approved, data_expiracao: date_approved.getTime() + (1000 * 60 * 60 * 24 * 30) });
                            signature = await this.signatureModel.findOne({ id_usuario: id });
                        }
                        else if (remainingDays < 0 && signature['status']) {
                            console.log('Mudou assinatura para false');
                            await this.userModel.findByIdAndUpdate(id, { status_assinante: false });
                            await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                            signature = await this.signatureModel.findOne({ id_usuario: id });
                        }
                    }
                }
                else {
                    console.log('Id  vazio');
                    if ((new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24) < 0 && signature['status']) {
                        console.log('Mudou assinatura para false');
                        await this.userModel.findByIdAndUpdate(id, { status_assinante: false });
                        await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                        signature = await this.signatureModel.findOne({ id_usuario: id });
                    }
                }
            }
            if (signature['tipo_pagamento'] == signature_schema_1.tipo[0]) {
                if (signature['status']) {
                    let remainingDays = (new Date(signature['data_expiracao']).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                    if (remainingDays < 0) {
                        console.log('mudou assinatura pra false');
                        await this.userModel.findByIdAndUpdate(signature['id_usuario'], { status_assinante: false });
                        await this.signatureModel.updateOne({ id_usuario: signature['id_usuario'] }, { status: false });
                        signature = await this.signatureModel.findOne({ id_usuario: id });
                    }
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
    __param(1, (0, mongoose_1.InjectModel)('usuarios')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map