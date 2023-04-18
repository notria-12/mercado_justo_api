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
exports.PublicPricesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const dto_1 = require("../prices/dto");
const schema_1 = require("../schema");
const public_prices_service_1 = require("./public-prices.service");
let PublicPricesController = class PublicPricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    findSpecificsPrices(query) {
        return this.pricesService.findSpecificPrices(query.productIds, query.marketIds.map((value, index) => Number(value)));
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Price)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetPriceDto]),
    __metadata("design:returntype", void 0)
], PublicPricesController.prototype, "findSpecificsPrices", null);
PublicPricesController = __decorate([
    (0, common_1.Controller)('precos-publicos'),
    __metadata("design:paramtypes", [public_prices_service_1.PublicPricesService])
], PublicPricesController);
exports.PublicPricesController = PublicPricesController;
//# sourceMappingURL=public-prices.controller.js.map