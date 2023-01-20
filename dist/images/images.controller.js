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
exports.ImagesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("./dto");
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    findAll(query) {
        return this.imagesService.findAll(query);
    }
    findOneBySupermarketId(id) {
        return this.imagesService.findOneBySupermarketId(+id);
    }
    findOneByBarcode(barcode) {
        return this.imagesService.findOneByBarcode(barcode);
    }
    update(id, updateImageDto) {
        return this.imagesService.update(id, updateImageDto);
    }
    bulkRemove(bulkRemoveDto) {
        return this.imagesService.bulkRemove(bulkRemoveDto);
    }
    remove(id) {
        return this.imagesService.remove(id);
    }
    import(files) {
        return this.imagesService.import(files);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Image)),
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Image)),
    (0, common_2.Public)(),
    (0, common_1.Get)('logo/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findOneBySupermarketId", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Image)),
    (0, common_2.Public)(),
    (0, common_1.Get)('produto/:barcode'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findOneByBarcode", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Image)),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Imagens),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateImageDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Imagens),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('bulk-remove'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.BulkRemoveDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "bulkRemove", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Imagens),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "remove", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Imagens),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    (0, common_1.Post)('importar'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "import", null);
ImagesController = __decorate([
    (0, common_2.ApiController)('Imagens', [schema_1.Image]),
    (0, common_2.NoAccessPlan)(),
    (0, common_1.Controller)('imagens'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map