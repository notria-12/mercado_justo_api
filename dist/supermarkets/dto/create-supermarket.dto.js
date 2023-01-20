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
exports.CreateSupermarketDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
const schema_1 = require("../../schema");
class CreateSupermarketDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nome: { required: true, type: () => String }, id: { required: true, type: () => Number }, site: { required: true, type: () => String }, cnpj: { required: true, type: () => String }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, telefone: { required: true, type: () => String }, endereco: { required: true, type: () => String }, cidade: { required: true, type: () => String }, uf: { required: true, type: () => Object, enum: schema_1.uf }, ordem: { required: true, type: () => Number }, visivel: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "nome", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSupermarketDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsUrl)({ require_protocol: true }),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "site", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsCNPJ)(),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "cnpj", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSupermarketDto.prototype, "latitude", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSupermarketDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsPhoneNumber)('BR'),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.uf),
    __metadata("design:type", String)
], CreateSupermarketDto.prototype, "uf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSupermarketDto.prototype, "ordem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSupermarketDto.prototype, "visivel", void 0);
exports.CreateSupermarketDto = CreateSupermarketDto;
//# sourceMappingURL=create-supermarket.dto.js.map