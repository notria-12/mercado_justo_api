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
exports.AccessResponse = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const schema_1 = require("../../schema");
class Access {
    static _OPENAPI_METADATA_FACTORY() {
        return { mes: { required: true, type: () => Number }, ano: { required: true, type: () => Number }, total: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Access.prototype, "mes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Access.prototype, "ano", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Access.prototype, "total", void 0);
class ProductsAccess {
    static _OPENAPI_METADATA_FACTORY() {
        return { acessos: { required: true, type: () => [Access] }, produto: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ProductsAccess.prototype, "acessos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ProductsAccess.prototype, "produto", void 0);
class AccessResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { usuarios: { required: true, type: () => [Access] }, produtos: { required: true, type: () => [ProductsAccess] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], AccessResponse.prototype, "usuarios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], AccessResponse.prototype, "produtos", void 0);
exports.AccessResponse = AccessResponse;
//# sourceMappingURL=access-response.entity.js.map