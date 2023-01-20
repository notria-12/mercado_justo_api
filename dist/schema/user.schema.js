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
exports.UserSchema = exports.User = exports.Address = exports.permissoes = exports.tipoConta = exports.uf = exports.orientacao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
exports.orientacao = ['masculino', 'feminino', 'outros'];
exports.uf = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
    'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];
exports.tipoConta = ['admin', 'operador', 'gerente', 'cliente'];
exports.permissoes = [
    'imagens', 'precos', 'usuarios', 'produtos', 'mercados', 'edicao_textos_app', 'gerenciamento_dados',
];
class Address {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "rua", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "complemento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "bairro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.uf }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "cep", void 0);
exports.Address = Address;
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "orientacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], User.prototype, "idade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Address }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Address)
], User.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "data_cadastro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "status_assinante", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "data_assinatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "data_assinatura_cancelada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "ultimo_acesso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "compartilhamentos", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: [Number] }),
    __metadata("design:type", Array)
], User.prototype, "responsavel_mercados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.tipoConta }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "tipo_conta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.permissoes }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "permissoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "google_id", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ google_id: 1 });
exports.UserSchema.index({ email: 1, cpf: 1 });
exports.UserSchema.index({ data_assinatura: 1, status_assinante: 1 });
exports.UserSchema.index({ data_assinatura_cancelada: 1, status_assinante: 1 });
exports.UserSchema.set('toObject', { virtuals: true });
exports.UserSchema.set('toJSON', { virtuals: true });
exports.UserSchema.virtual('mercado', {
    ref: 'mercados',
    localField: 'responsavel_mercados',
    foreignField: 'id',
    justOne: true
});
//# sourceMappingURL=user.schema.js.map