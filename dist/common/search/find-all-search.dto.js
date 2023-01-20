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
exports.FindAllSearchDto = exports.SearchObj = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("..");
const pagination_1 = require("../pagination");
class SearchObj {
    static _OPENAPI_METADATA_FACTORY() {
        return { termo: { required: true, type: () => String }, valor: { required: true, type: () => Object }, estrito: { required: true, type: () => Boolean }, tipo: { required: true, type: () => Object }, multi: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], SearchObj.prototype, "termo", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SearchObj.prototype, "valor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchObj.prototype, "estrito", void 0);
__decorate([
    (0, common_1.IsNotEmpty)(),
    (0, common_1.IsString)(),
    __metadata("design:type", String)
], SearchObj.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchObj.prototype, "multi", void 0);
exports.SearchObj = SearchObj;
class FindAllSearchDto extends pagination_1.PaginationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { procurar: { required: false, type: () => [require("./find-all-search.dto").SearchObj] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        isArray: true,
        description: 'Filtra através dos campos. Ex.: campo,valor'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SearchObj),
    __metadata("design:type", Array)
], FindAllSearchDto.prototype, "procurar", void 0);
exports.FindAllSearchDto = FindAllSearchDto;
//# sourceMappingURL=find-all-search.dto.js.map