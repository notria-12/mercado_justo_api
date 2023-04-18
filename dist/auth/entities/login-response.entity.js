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
exports.LoginResponse = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class UserResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, nome: { required: true, type: () => String }, email: { required: true, type: () => String }, cpf: { required: true, type: () => String }, telefone: { required: true, type: () => String }, login: { required: true, type: () => String }, tipo_conta: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "tipo_conta", void 0);
class LoginResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { access_token: { required: true, type: () => String }, usuario: { required: true, type: () => UserResponse } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserResponse)
], LoginResponse.prototype, "usuario", void 0);
exports.LoginResponse = LoginResponse;
//# sourceMappingURL=login-response.entity.js.map