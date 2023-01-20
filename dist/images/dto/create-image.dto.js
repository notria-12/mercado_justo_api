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
exports.CreateImageDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
const schema_1 = require("../../schema");
class CreateImageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, id: { required: true, type: () => Number }, codigo_barras: { required: true, type: () => String }, categoria: { required: true, type: () => Object, enum: schema_1.imageCategory } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsUrl)(),
    __metadata("design:type", String)
], CreateImageDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => typeof o.codigo_barras == 'undefined'),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateImageDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => typeof o.id == 'undefined'),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], CreateImageDto.prototype, "codigo_barras", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsIn)(schema_1.imageCategory),
    __metadata("design:type", String)
], CreateImageDto.prototype, "categoria", void 0);
exports.CreateImageDto = CreateImageDto;
//# sourceMappingURL=create-image.dto.js.map