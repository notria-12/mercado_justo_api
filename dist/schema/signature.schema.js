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
exports.SignatureSchema = exports.Signature = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
let Signature = class Signature {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Signature.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Signature.prototype, "pagamento_pendente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Signature.prototype, "id_pagamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Signature.prototype, "ultima_assinatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Signature.prototype, "data_expiracao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_schema_1.User }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }),
    __metadata("design:type", Object)
], Signature.prototype, "id_usuario", void 0);
Signature = __decorate([
    (0, mongoose_1.Schema)()
], Signature);
exports.Signature = Signature;
exports.SignatureSchema = mongoose_1.SchemaFactory.createForClass(Signature);
exports.SignatureSchema.set('timestamps', {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});
//# sourceMappingURL=signature.schema.js.map