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
exports.LogSchema = exports.Log = exports.acao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const schema_1 = require("./");
exports.acao = ['criar', 'atualizar', 'remover', 'remover-muitos', 'criar-muitos'];
let Log = class Log {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ enum: exports.acao }),
    __metadata("design:type", String)
], Log.prototype, "acao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Log.prototype, "colecao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: schema_1.User }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }),
    __metadata("design:type", Object)
], Log.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Log.prototype, "documento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Log.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Log.prototype, "ip", void 0);
Log = __decorate([
    (0, mongoose_1.Schema)()
], Log);
exports.Log = Log;
exports.LogSchema = mongoose_1.SchemaFactory.createForClass(Log);
//# sourceMappingURL=log.schema.js.map