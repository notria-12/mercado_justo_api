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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const local_1 = require("./local");
const auth_service_1 = require("./auth.service");
const common_2 = require("../common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const entities_1 = require("./entities");
const dto_2 = require("../mail/dto");
const login_phone_dto_1 = require("./dto/login-phone.dto");
const send_email_token_dto_1 = require("../mail/dto/send-email-token.dto");
const receive_token_dto_1 = require("../mail/dto/receive-token.dto");
const send_sms_token_dto_1 = require("../mail/dto/send-sms-token.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async loginGoogle(loginGoogle) {
        return this.authService.loginGoogle(loginGoogle);
    }
    async loginPhone(loginPhone) {
        return this.authService.loginPhone(loginPhone);
    }
    async loginEmailToken(email) {
        return this.authService.sendEmailToken(email);
    }
    async verifyPhoneNumber(telefone) {
        return this.authService.verifyPhoneNumber(telefone);
    }
    confirmEmailToken(receiveToken) {
        return this.authService.confirmEmailToken(receiveToken);
    }
    validate(validateTokenDto) {
        return this.authService.validateExternal(validateTokenDto.access_token);
    }
    confirmRecoverPassword(newPassword) {
        return this.authService.confirmRecoverPassword(newPassword);
    }
    sendRecoverPassword(recoverPassword) {
        return this.authService.sendRecoverPassword(recoverPassword);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: entities_1.CreateLogin }),
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(entities_1.LoginResponse)),
    (0, common_2.Public)(),
    (0, common_1.UseGuards)(local_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(entities_1.LoginResponse)),
    (0, common_2.Public)(),
    (0, common_1.Post)('login-google'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(entities_1.LoginResponse)),
    (0, common_2.Public)(),
    (0, common_1.Post)('login-phone'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_phone_dto_1.LoginPhoneDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginPhone", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('object')),
    (0, common_2.Public)(),
    (0, common_1.Post)('codigo-login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_token_dto_1.SendEmailTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginEmailToken", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('object')),
    (0, common_2.Public)(),
    (0, common_1.Post)('verifica-numero'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_sms_token_dto_1.SendSmsTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPhoneNumber", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('object')),
    (0, common_2.Public)(),
    (0, common_1.Post)('login-email'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receive_token_dto_1.ReceiveTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "confirmEmailToken", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('boolean')),
    (0, common_1.Post)('validar'),
    (0, common_2.Public)(),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validate", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('object')),
    (0, common_2.Public)(),
    (0, common_1.Post)('recuperar-senha/confirmar'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.NewPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "confirmRecoverPassword", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.applyType('object')),
    (0, common_2.Public)(),
    (0, common_1.Post)('recuperar-senha'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.RecoverPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendRecoverPassword", null);
AuthController = __decorate([
    (0, common_2.ApiController)('Login', [entities_1.LoginResponse]),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map