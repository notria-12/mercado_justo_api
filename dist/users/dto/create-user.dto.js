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
exports.CreateUserAppDto = exports.CreateUserDto = exports.AddressDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_1 = require("../../common");
const schema_1 = require("../../schema");
class AddressDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { rua: { required: true, type: () => String }, numero: { required: true, type: () => String }, complemento: { required: true, type: () => String }, bairro: { required: true, type: () => String }, cidade: { required: true, type: () => String }, uf: { required: true, type: () => Object, enum: schema_1.uf }, cep: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "rua", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "complemento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "bairro", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: schema_1.uf }),
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsIn)(schema_1.uf),
    __metadata("design:type", String)
], AddressDto.prototype, "uf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsCEP)(),
    __metadata("design:type", String)
], AddressDto.prototype, "cep", void 0);
exports.AddressDto = AddressDto;
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nome: { required: true, type: () => String }, cpf: { required: true, type: () => String }, email: { required: true, type: () => String }, telefone: { required: true, type: () => String }, orientacao: { required: true, type: () => Object, enum: schema_1.orientacao }, idade: { required: true, type: () => Number, minimum: 18 }, senha: { required: true, type: () => String, minLength: 8 }, responsavel_mercados: { required: true, type: () => [Number] }, tipo_conta: { required: true, type: () => Object, enum: schema_1.tipoConta }, permissoes: { required: true, type: () => [Object], enum: schema_1.permissoes }, google_id: { required: false, type: () => String }, endereco: { required: false, type: () => require("./create-user.dto").AddressDto } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsCPF)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cpf", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.tipo_conta || o.tipo_conta != 'gerente'),
    (0, common_1.IsPhoneNumber)('BR'),
    __metadata("design:type", String)
], CreateUserDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: schema_1.orientacao }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.orientacao),
    __metadata("design:type", String)
], CreateUserDto.prototype, "orientacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    (0, common_1.Min)(18),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "idade", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    (0, common_1.MinLength)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsArray)(),
    (0, common_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "responsavel_mercados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: schema_1.tipoConta }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.tipoConta),
    __metadata("design:type", String)
], CreateUserDto.prototype, "tipo_conta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [schema_1.permissoes] }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsArray)(),
    (0, common_1.IsIn)(schema_1.permissoes, { each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "permissoes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "google_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], CreateUserDto.prototype, "endereco", void 0);
exports.CreateUserDto = CreateUserDto;
class CreateUserAppDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nome: { required: true, type: () => String }, cpf: { required: true, type: () => String }, email: { required: true, type: () => String }, telefone: { required: true, type: () => String }, orientacao: { required: true, type: () => Object, enum: schema_1.orientacao }, idade: { required: true, type: () => Number, minimum: 18 }, tipo_conta: { required: true, type: () => Object, enum: schema_1.tipoConta }, permissoes: { required: true, type: () => [Object], enum: schema_1.permissoes }, google_id: { required: false, type: () => String }, endereco: { required: false, type: () => require("./create-user.dto").AddressDto }, invitedBy: { required: true, type: () => String } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "nome", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsCPF)(),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "cpf", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.tipo_conta || o.tipo_conta != 'gerente'),
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsPhoneNumber)('BR'),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: schema_1.orientacao }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.orientacao),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "orientacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    (0, common_1.Min)(18),
    __metadata("design:type", Number)
], CreateUserAppDto.prototype, "idade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: schema_1.tipoConta }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsIn)(schema_1.tipoConta),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "tipo_conta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [schema_1.permissoes] }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsArray)(),
    (0, common_1.IsIn)(schema_1.permissoes, { each: true }),
    __metadata("design:type", Array)
], CreateUserAppDto.prototype, "permissoes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "google_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], CreateUserAppDto.prototype, "endereco", void 0);
__decorate([
    (0, common_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserAppDto.prototype, "invitedBy", void 0);
exports.CreateUserAppDto = CreateUserAppDto;
//# sourceMappingURL=create-user.dto.js.map