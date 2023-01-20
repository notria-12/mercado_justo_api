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
exports.LoginPhoneDto = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("../../common");
class LoginPhoneDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firebase_token: { required: true, type: () => String }, phone: { required: true, type: () => String } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], LoginPhoneDto.prototype, "firebase_token", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], LoginPhoneDto.prototype, "phone", void 0);
exports.LoginPhoneDto = LoginPhoneDto;
//# sourceMappingURL=login-phone.dto.js.map