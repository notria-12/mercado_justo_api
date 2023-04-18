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
exports.PaginationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("..");
class PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { itens_pagina: { required: false, type: () => Number }, ordernar: { required: false, type: () => String }, pagina: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "itens_pagina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '1 desc; -1 asc; Ex.: campo, 1.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "ordernar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, common_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pagina", void 0);
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map