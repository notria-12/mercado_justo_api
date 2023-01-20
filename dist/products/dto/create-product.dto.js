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
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
const schema_1 = require("../../schema");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { descricao: { required: true, type: () => String }, codigo_barras: { required: true, type: () => [String] }, categoria_1: { required: true, type: () => String }, categoria_2: { required: true, type: () => String }, categoria_3: { required: true, type: () => String }, unidade: { required: true, type: () => Object, enum: schema_1.unidade }, cidade: { required: true, type: () => String }, uf: { required: true, type: () => Object, enum: schema_1.uf }, ordem: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "descricao", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "codigo_barras", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoria_1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoria_2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoria_3", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.unidade),
    __metadata("design:type", String)
], CreateProductDto.prototype, "unidade", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !!o.uf),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.uf),
    __metadata("design:type", String)
], CreateProductDto.prototype, "uf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "ordem", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map