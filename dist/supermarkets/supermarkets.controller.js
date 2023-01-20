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
exports.SupermarketsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const supermarkets_service_1 = require("./supermarkets.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
const platform_express_1 = require("@nestjs/platform-express");
let SupermarketsController = class SupermarketsController {
    constructor(supermarketsService) {
        this.supermarketsService = supermarketsService;
    }
    create(createSupermarketDto) {
        return this.supermarketsService.create(createSupermarketDto);
    }
    findAll(query) {
        return this.supermarketsService.findAll(query);
    }
    getList(query) {
        return this.supermarketsService.getList(query);
    }
    findOne(id) {
        return this.supermarketsService.findOne(id);
    }
    update(id, updateSupermarketDto) {
        return this.supermarketsService.update(id, updateSupermarketDto);
    }
    bulkRemove(bulkRemoveDto) {
        return this.supermarketsService.bulkRemove(bulkRemoveDto);
    }
    remove(id) {
        return this.supermarketsService.remove(id);
    }
    import(file) {
        return this.supermarketsService.import(file);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.Supermarket)),
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Mercados),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSupermarketDto]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Supermarket)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(common_2.GetListModel)),
    (0, common_1.Get)('listar'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "getList", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Supermarket)),
    (0, common_2.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Supermarket)),
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Mercados),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSupermarketDto]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Mercados),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('bulk-remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.BulkRemoveDto]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "bulkRemove", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Mercados),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "remove", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Mercados),
    (0, common_2.ApiFile)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('importar'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupermarketsController.prototype, "import", null);
SupermarketsController = __decorate([
    (0, common_2.ApiController)('Supermercados', [schema_1.Supermarket]),
    (0, common_2.NoAccessPlan)(),
    (0, common_1.Controller)('mercados'),
    __metadata("design:paramtypes", [supermarkets_service_1.SupermarketsService])
], SupermarketsController);
exports.SupermarketsController = SupermarketsController;
//# sourceMappingURL=supermarkets.controller.js.map