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
exports.ImageSchema = exports.Image = exports.imageCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
exports.imageCategory = ['logo', 'produto'];
let Image = class Image {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "codigo_barras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ enum: exports.imageCategory }),
    __metadata("design:type", String)
], Image.prototype, "categoria", void 0);
Image = __decorate([
    (0, mongoose_1.Schema)()
], Image);
exports.Image = Image;
exports.ImageSchema = mongoose_1.SchemaFactory.createForClass(Image);
exports.ImageSchema.index({ id: 1, categoria: 1 });
exports.ImageSchema.index({ codigo_barras: 1, categoria: 1 });
exports.ImageSchema.set('toObject', { virtuals: true });
exports.ImageSchema.set('toJSON', { virtuals: true });
exports.ImageSchema.virtual('produto', {
    ref: 'produtos',
    localField: 'codigo_barras',
    foreignField: 'codigo_barras',
    justOne: true
});
exports.ImageSchema.virtual('mercado', {
    ref: 'mercados',
    localField: 'id',
    foreignField: 'id',
    justOne: true
});
//# sourceMappingURL=image.schema.js.map