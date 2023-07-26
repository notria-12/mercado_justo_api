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
                let signatureMP = await this.buscaAssinaturaCIELO(signatureId);
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
    async buscaAssinaturaCIELO(id) {
        try {
            let responseSignature = await axios_1.default.get(process.env.BASE_URL_QUERY + '/1/RecurrentPayment/' + id, { headers: {
                    'MerchantId': process.env.MERCHANT_ID,
                    'MerchantKey': process.env.MERCHANT_KEY
                } });
            console.log(responseSignature.data);
            return responseSignature.data;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async cancelSingnature(id) {
        try {
            var response = await axios_1.default.put(process.env.BASE_URL_TRANSACTION + '/1/RecurrentPayment/' + id + '/Deactivate', {}, { headers: {
                    'MerchantId': process.env.MERCHANT_ID,
                    'MerchantKey': process.env.MERCHANT_KEY
                }, });
            if (response.status == 200) {
                await this.signatureModel.updateOne({ id_assinatura: id }, { pagamento_pendente: false, card_token: '', tipo_pagamento: signature_schema_1.tipo[2] });
            }
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
    getCardBrand(cardNumber) {
        const cardBrands = {
            VISA: /^4\d{3}/,
            Master: /^5[1-5]\d{2}/,
            Elo: /^(401178|401179|438935|457631|457632|431274|451416|457393|504175|627780|636297|636368|650488|650490|650576|650690|650720|650747|650901|650902|650903|650904|650905|651653|655000|655001|651653|651652|506699|506770|506771|506772|506773|506774|506775|506776|506777|506778|506779|506780|506781|506782|506783|506784|506785|506786|506787|506788|506789|506790|506791|506792|506793|506794|506795|506796|506797|506798|506799)\d{10}/,
            'American Express': /^3[47]\d{2}/,
        };
        for (const brand in cardBrands) {
            if (cardBrands[brand].test(cardNumber)) {
                return brand;
            }
        }
        return 'Bandeira desconhecida';
    }
    async createSignature(createSignature) {
        try {
            console.log('SIGNATUREDTO::', createSignature);
            const user = await this.userModel.findById(createSignature.id_usuario);
            if (user) {
                const brand = this.getCardBrand(createSignature.card.card_number);
                console.log("BRAND::", brand);
                const signatureBody = {
                    "MerchantOrderId": "02131",
                    "Customer": {
                        "Name": user.nome,
                        "Email": user.email,
                        "Identity": user.cpf,
                        "IdentityType": "CPF",
                    },
                    "Payment": {
                        "Installments": 1,
                        "RecurrentPayment": {
                            "AuthorizeNow": true,
                            "Interval": "Monthly"
                        },
                        "CreditCard": {
                            "CardNumber": createSignature.card.card_number,
                            "Holder": createSignature.card.holder_name,
                            "ExpirationDate": createSignature.card.expiration_month + '/' + createSignature.card.expiration_year,
                            "SecurityCode": createSignature.card.security_code,
                            "SaveCard": true,
                            "Brand": brand
                        },
                        "SoftDescriptor": "Mercado Justo",
                        "Type": "CreditCard",
                        "Amount": 5,
                        "Currency": "BRL",
                        "Country": "BRA"
                    }
                };
                var responsePlan = await axios_1.default.post(process.env.BASE_URL_TRANSACTION + '/1/sales', JSON.stringify(signatureBody), {
                    headers: {
                        'MerchantId': process.env.MERCHANT_ID,
                        'MerchantKey': process.env.MERCHANT_KEY
                    }
                });
                console.log("RESPONSE::::", responsePlan.data);
                if (!(responsePlan.status >= 200 && responsePlan.status <= 299)) {
                    throw new common_1.UnauthorizedException();
                }
                if (responsePlan.data['Payment']['RecurrentPayment']['ReasonCode'] == 0) {
                    let signature = (await this.signatureModel.findOne({ id_usuario: createSignature.id_usuario }));
                    if (signature) {
                        await this.signatureModel.updateOne({ id_usuario: createSignature.id_usuario }, { status: true, data_expiracao: new Date(responsePlan.data['Payment']['RecurrentPayment']['NextRecurrency']).getTime(), ultima_assinatura: Date.now(), id_assinatura: responsePlan.data['Payment']['RecurrentPayment']['RecurrentPaymentId'], tipo_pagamento: signature_schema_1.tipo[0], id_pagamento: responsePlan.data['Payment']['PaymentId'] });
                    }
                    else {
                        const signature = new this.signatureModel({ status: true, data_expiracao: new Date(responsePlan.data['Payment']['RecurrentPayment']['NextRecurrency']).getTime(), ultima_assinatura: Date.now(), id_usuario: createSignature.id_usuario, card_token: undefined, tipo_pagamento: signature_schema_1.tipo[0], id_pagamento: responsePlan.data['Payment']['PaymentId'], id_assinatura: responsePlan.data['Payment']['RecurrentPayment']['RecurrentPaymentId'] });
                        signature.save();
                    }
                    return responsePlan.data;
                }
                else {
                    throw new common_1.UnauthorizedException({ mensagem: "Problemas com o Cartão", codigo: "invalid_card" });
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
                var result = await axios_1.default.post('https://api.mercadopago.com/v1/card_tokens?public_key=APP_USR-4017638a-dedd-4113-b8b0-5d5e32788862', cardInfo, {
                    headers: {
                        'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`
                    }
                });
                console.log(result);
                var token = result.data['id'];
                if (signature) {
                    await this.signatureModel.updateOne({ id_usuario: createCard.user_id }, { card_token: token, tipo_pagamento: signature_schema_1.tipo[0] });
                }
                else {
                    const createSignature = new this.signatureModel({ id_pagamento: '', status: false, data_expiracao: null, ultima_assinatura: null, id_usuario: createCard.user_id, card_token: token, tipo_pagamento: signature_schema_1.tipo[0] });
                    createSignature.save();
                }
                return result.data;
            }
            catch (e) {
                return e;
            }
        }
        else {
            throw new common_1.NotFoundException({ mensagem: "Usuário não encontrado", codigo: "not_found_user" });
        }
    }
    async getPaymentInfo(user_id) {
        const user = await this.userModel.findById(user_id);
        if (user) {
            const signature = await this.signatureModel.findOne({ id_usuario: user_id });
            if (signature) {
                if (signature['id_pagamento']) {
                    let responsePayment = await axios_1.default.get(process.env.BASE_URL_QUERY + '/1/sales/' + signature['id_pagamento'], { headers: {
                            'MerchantId': process.env.MERCHANT_ID,
                            'MerchantKey': process.env.MERCHANT_KEY
                        } });
                    return responsePayment.data;
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