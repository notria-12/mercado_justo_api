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
exports.PricesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
const platform_express_1 = require("@nestjs/platform-express");
const get_average_price_dto_1 = require("./dto/get-average-price.dto");
let PricesController = class PricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    create(createPriceDto) {
        return this.pricesService.create(createPriceDto);
    }
    findAll(query) {
        return this.pricesService.findAll(query);
    }
    findSpecificsPrices(query) {
        return this.pricesService.findSpecificPrices(query.productIds, query.marketIds.map((value, index) => Number(value)));
    }
    getAveragePrice(query) {
        return this.pricesService.getAveragePrice(query.productId, query.marketIds.map((value, index) => Number(value)));
    }
    findOne(id) {
        return this.pricesService.findOne(id);
    }
    update(id, updatePriceDto) {
        return this.pricesService.update(id, updatePriceDto);
    }
    bulkRemove(bulkRemoveDto) {
        return this.pricesService.bulkRemove(bulkRemoveDto);
    }
    remove(id) {
        return this.pricesService.remove(id);
    }
    import(file) {
        return this.pricesService.import(file);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.Price)),
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Precos),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePriceDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Price)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Price)),
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente, roles_1.Role.Cliente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Produtos, permissions_1.Permission.Precos),
    (0, common_1.Get)('specifics-prices'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetPriceDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "findSpecificsPrices", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Price)),
    (0, common_2.Public)(),
    (0, common_1.Get)('preco-medio'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_average_price_dto_1.GetAveragePriceDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "getAveragePrice", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Price)),
    (0, common_2.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Price)),
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Precos),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePriceDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Precos),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('bulk-remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.BulkRemoveDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "bulkRemove", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Precos),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "remove", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Operador, roles_1.Role.Gerente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Precos),
    (0, common_2.ApiFile)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('importar'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "import", null);
PricesController = __decorate([
    (0, common_2.ApiController)('Preços', [schema_1.Price]),
    (0, common_1.Controller)('precos'),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], PricesController);
exports.PricesController = PricesController;
//# sourceMappingURL=prices.controller.js.map