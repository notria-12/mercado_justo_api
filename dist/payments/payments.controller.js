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
exports.PaymentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const create_pix_dto_1 = require("./dtos/create-pix.dto");
const create_preference_dto_1 = require("./dtos/create-preference.dto");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async geraChavePix(createPixDto) {
        return this.paymentsService.geraChavePix(createPixDto);
    }
    buscaAssinatura(id) {
        return this.paymentsService.buscaAssinatura(id);
    }
    buscaDiasRestantes(id) {
        return this.paymentsService.buscaDiasRestantes(id);
    }
    buscaPreferencia(createPreference) {
        return this.paymentsService.buscaPreferencia(createPreference);
    }
};
__decorate([
    (0, common_1.Post)('pix'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pix_dto_1.CreatePixDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "geraChavePix", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "buscaAssinatura", null);
__decorate([
    (0, common_1.Get)('dias/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "buscaDiasRestantes", null);
__decorate([
    (0, common_1.Post)('preferencias/'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferenceDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "buscaPreferencia", null);
PaymentsController = __decorate([
    (0, common_1.Controller)('assinaturas'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map