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
exports.PriceSchema = exports.Price = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const schema_1 = require("./");
let Price = class Price {
    constructor(id, produto, preco) {
        this.produto = produto;
        this.id = id;
        this.preco = preco;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: schema_1.Product }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'produtos' }),
    __metadata("design:type", Object)
], Price.prototype, "produto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Price.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Price.prototype, "preco", void 0);
Price = __decorate([
    (0, mongoose_1.Schema)(),
    __metadata("design:paramtypes", [Object, Object, Object])
], Price);
exports.Price = Price;
exports.PriceSchema = mongoose_1.SchemaFactory.createForClass(Price);
exports.PriceSchema.set('timestamps', {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});
exports.PriceSchema.index({ id: 1, produto: 1 });
//# sourceMappingURL=price.schema.js.map