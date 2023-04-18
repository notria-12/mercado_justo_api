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
exports.FaqController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const faq_service_1 = require("./faq.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
let FaqController = class FaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    create(createFaqDto) {
        return this.faqService.create(createFaqDto);
    }
    findAll(query) {
        return this.faqService.findAll(query);
    }
    findOne(id) {
        return this.faqService.findOne(id);
    }
    update(id, updateFaqDto) {
        return this.faqService.update(id, updateFaqDto);
    }
    remove(id) {
        return this.faqService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.FAQ)),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.FAQ)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.FAQ)),
    (0, common_2.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.FAQ)),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "remove", null);
FaqController = __decorate([
    (0, common_2.ApiController)('Perguntas Frequentes', [schema_1.FAQ]),
    (0, common_1.Controller)('perguntas-frequentes'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
exports.FaqController = FaqController;
//# sourceMappingURL=faq.controller.js.map