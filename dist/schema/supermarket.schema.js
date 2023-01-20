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
exports.SupermarketSchema = exports.Supermarket = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const _1 = require(".");
let Supermarket = class Supermarket {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Supermarket.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Supermarket.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Supermarket.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: _1.uf }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supermarket.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Supermarket.prototype, "ordem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Supermarket.prototype, "visivel", void 0);
Supermarket = __decorate([
    (0, mongoose_1.Schema)()
], Supermarket);
exports.Supermarket = Supermarket;
exports.SupermarketSchema = mongoose_1.SchemaFactory.createForClass(Supermarket);
exports.SupermarketSchema.index({ id: 1 });
exports.SupermarketSchema.index({ nome: 1 });
exports.SupermarketSchema.set('toObject', { virtuals: true });
exports.SupermarketSchema.set('toJSON', { virtuals: true });
exports.SupermarketSchema.virtual('responsavel', {
    ref: 'usuarios',
    localField: 'id',
    foreignField: 'responsavel_mercados',
    justOne: true,
});
//# sourceMappingURL=supermarket.schema.js.map