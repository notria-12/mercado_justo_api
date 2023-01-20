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
exports.CreatePixDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
class CreatePixDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nome: { required: true, type: () => String }, cpf: { required: true, type: () => String }, email: { required: true, type: () => String }, telefone: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePixDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePixDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, common_1.IsCPF)(),
    __metadata("design:type", String)
], CreatePixDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, common_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePixDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.tipo_conta || o.tipo_conta != 'gerente'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)('BR'),
    __metadata("design:type", String)
], CreatePixDto.prototype, "telefone", void 0);
exports.CreatePixDto = CreatePixDto;
//# sourceMappingURL=create-pix.dto.js.map