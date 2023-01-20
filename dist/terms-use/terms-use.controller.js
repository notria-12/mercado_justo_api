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
exports.TermsUseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const terms_use_service_1 = require("./terms-use.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
let TermsUseController = class TermsUseController {
    constructor(termsUseService) {
        this.termsUseService = termsUseService;
    }
    create(createTermsUseDto) {
        return this.termsUseService.create(createTermsUseDto);
    }
    findOne() {
        return this.termsUseService.findOne();
    }
    update(updateTermsUseDto) {
        return this.termsUseService.update(updateTermsUseDto);
    }
    remove() {
        return this.termsUseService.remove();
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.TermsUse)),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTermsUseDto]),
    __metadata("design:returntype", void 0)
], TermsUseController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.TermsUse)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TermsUseController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.TermsUse)),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTermsUseDto]),
    __metadata("design:returntype", void 0)
], TermsUseController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.EdicaoTextosApp),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TermsUseController.prototype, "remove", null);
TermsUseController = __decorate([
    (0, common_2.ApiController)('Termos de Uso', [schema_1.TermsUse]),
    (0, common_1.Controller)('termos-uso'),
    __metadata("design:paramtypes", [terms_use_service_1.TermsUseService])
], TermsUseController);
exports.TermsUseController = TermsUseController;
//# sourceMappingURL=terms-use.controller.js.map