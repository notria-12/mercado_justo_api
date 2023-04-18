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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicSupermarketsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const public_supermarkets_service_1 = require("./public-supermarkets.service");
let PublicSupermarketsController = class PublicSupermarketsController {
    constructor(supermarketsService) {
        this.supermarketsService = supermarketsService;
    }
    findPublicSupermarkets() {
        return this.supermarketsService.findPublicSupermarkets();
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Supermarket)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicSupermarketsController.prototype, "findPublicSupermarkets", null);
PublicSupermarketsController = __decorate([
    (0, common_1.Controller)('mercados-publicos'),
    __metadata("design:paramtypes", [public_supermarkets_service_1.PublicSupermarketsService])
], PublicSupermarketsController);
exports.PublicSupermarketsController = PublicSupermarketsController;
//# sourceMappingURL=public-supermarkets.controller.js.map