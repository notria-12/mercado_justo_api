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
exports.CreatePreferenceDto = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("../../common");
class CreatePreferenceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String } };
    }
}
__decorate([
    (0, common_1.IsString)(),
    (0, common_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePreferenceDto.prototype, "email", void 0);
exports.CreatePreferenceDto = CreatePreferenceDto;
//# sourceMappingURL=create-preference.dto.js.map