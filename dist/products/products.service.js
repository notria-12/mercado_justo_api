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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
const products_import_1 = require("./products.import");
const event_emitter_1 = require("@nestjs/event-emitter");
const cls_service_1 = require("nestjs-cls/dist/src/lib/cls.service");
const user_payload_entity_1 = require("../auth/entities/user-payload.entity");
let ProductsService = class ProductsService {
    constructor(schemaModel, eventEmitter, clsService, productsImport) {
        this.schemaModel = schemaModel;
        this.eventEmitter = eventEmitter;
        this.clsService = clsService;
        this.productsImport = productsImport;
    }
    async create(createProductDto) {
        if (typeof createProductDto.ordem === 'number') {
            if (!(await this.isProductPosAvailable(createProductDto))) {
                throw new common_1.BadRequestException({
                    mensagem: 'Já existe um produto nesta ordem.',
                    dados: {}
                });
            }
        }
        const exists = await this.schemaModel.exists({
            codigo_barras: {
                $in: createProductDto.codigo_barras,
            },
            cidade: createProductDto.cidade
        });
        if (exists) {
            return await this.schemaModel.findOneAndUpdate({
                codigo_barras: {
                    $in: createProductDto.codigo_barras,
                },
                cidade: createProductDto.cidade
            }, createProductDto, { new: true });
        }
        else {
            const newProduct = new this.schemaModel(Object.assign({}, createProductDto));
            return await newProduct.save();
        }
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query);
    }
    async findOne(id) {
        this.eventEmitter.emit('access.produtos', {
            documento: id,
            usuario: this.clsService.get('user').userId || null,
            colecao: 'produtos'
        });
        return await this.schemaModel.findById(id);
    }
    async findByCategory(category) {
        return await this.schemaModel.find({ $or: [{ categoria_1: category }, { categoria_2: category }] });
    }
    async getList() {
        return await this.schemaModel.aggregate([
            { $match: {} },
            {
                $project: {
                    _id: 0,
                    value: '$_id',
                    text: '$nome'
                }
            }
        ]);
    }
    async update(id, updateProductDto) {
        if (typeof updateProductDto.ordem === 'number') {
            if (!(await this.isProductPosAvailable(updateProductDto, id))) {
                throw new common_1.BadRequestException({
                    mensagem: 'Já existe um produto nesta ordem.',
                    dados: {}
                });
            }
        }
        return await this.schemaModel.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
    }
    async remove(id) {
        await this.schemaModel.deleteOne({ _id: id });
        return {};
    }
    async bulkRemove(bulkRemoveDto) {
        await this.schemaModel.deleteMany({
            _id: {
                $in: bulkRemoveDto.ids
            }
        });
        return {};
    }
    async import(file) {
        return await this.productsImport.import(file);
    }
    async isProductPosAvailable(product, id = null) {
        if (id) {
            return !(await this.schemaModel.exists({
                _id: { $ne: id },
                cidade: product.cidade,
                ordem: product.ordem
            }));
        }
        else {
            return !(await this.schemaModel.exists({
                cidade: product.cidade,
                ordem: product.ordem
            }));
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('produtos')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        event_emitter_1.EventEmitter2,
        cls_service_1.ClsService,
        products_import_1.ProductsImport])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map