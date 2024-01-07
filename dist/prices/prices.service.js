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
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
const entities_1 = require("../auth/entities");
const nestjs_cls_1 = require("nestjs-cls");
const event_emitter_1 = require("@nestjs/event-emitter");
const prices_import_1 = require("./prices.import");
let PricesService = class PricesService {
    constructor(schemaModel, productsModel, clsService, eventEmitter, pricesImport) {
        this.schemaModel = schemaModel;
        this.productsModel = productsModel;
        this.clsService = clsService;
        this.eventEmitter = eventEmitter;
        this.pricesImport = pricesImport;
    }
    async create(createPriceDto) {
        const newPrice = new this.schemaModel(createPriceDto);
        if (this.userHasAccessToId(createPriceDto.id)) {
            const exists = await this.schemaModel.exists({
                id: createPriceDto.id,
                produto: createPriceDto.produto
            });
            if (exists) {
                return await this.schemaModel.findOneAndUpdate({
                    id: createPriceDto.id,
                    produto: createPriceDto.produto
                }, createPriceDto, { new: true }).populate('produto');
            }
            else {
                return await (await newPrice.save()).populate('produto');
            }
        }
        else {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui acesso a este ID.',
                dados: {}
            });
        }
    }
    async findAll(query) {
        const productSearchKeys = ['codigo_barras', 'descricao'];
        const priceSearchKeys = ['id', 'preco'];
        const searchObj = (0, common_2.generateSearchObject)(query);
        if (Object.keys(searchObj).some(key => productSearchKeys.includes(key))) {
            const productSearch = Object.keys(searchObj)
                .filter(key => productSearchKeys.includes(key))
                .reduce((acc, cur) => Object.assign(acc, { [cur]: searchObj[cur] }), {});
            const products = await this.productsModel.find(productSearch);
            const priceQuery = (0, common_2.tryToParse)(query.procurar)
                .filter((searchObj) => priceSearchKeys.includes(searchObj.termo));
            return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, Object.assign(Object.assign({}, query), { procurar: priceQuery }), '', 'produto', {
                produto: {
                    $in: products.map(prod => prod._id)
                }
            });
        }
        else {
            return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '', 'produto');
        }
    }
    async findOne(id) {
        this.eventEmitter.emit('access.precos', {
            documento: id,
            usuario: this.clsService.get('user').userId || null,
            colecao: 'precos'
        });
        return await this.schemaModel.findById(id)
            .populate('produto');
    }
    async findSpecificPrices(productIds, marketsIds) {
        let prices = await this.schemaModel.find({
            "id": { $in: marketsIds }, "produto": { $in: productIds }
        });
        let ordenedPrices = [];
        productIds.forEach((productId, index) => {
            let pricesByProducts = prices.filter((price) => price.produto == productId);
            marketsIds.forEach((marketsId) => {
                if (pricesByProducts.filter((price) => price.id == marketsId).length == 0) {
                    let newPrice = Object.assign({}, prices[0]);
                    newPrice.id = marketsId,
                        newPrice.preco = 'Em Falta';
                    newPrice.produto = productId;
                    pricesByProducts.push(newPrice);
                }
            });
            ordenedPrices.push(pricesByProducts.sort((a, b) => a.id - b.id));
        });
        return ordenedPrices;
    }
    async getAveragePrice(productId, marketsIds) {
        let prices = await this.schemaModel.find({
            "id": { $in: marketsIds }, "produto": productId
        });
        let sumPrices = 0.0;
        let totalMissingPrices = 0;
        prices.forEach((price, index) => {
            if (price['preco'] != 'Em Falta' && price['preco'] != '') {
                sumPrices += +(price['preco'].replace('R$ ', '').replace(',', '.'));
            }
            else {
                totalMissingPrices++;
            }
        });
        return { 'preco-medio': (sumPrices / (prices.length - totalMissingPrices)) };
    }
    async update(id, updatePriceDto) {
        if (this.userHasAccessToId(updatePriceDto.id)) {
            return await this.schemaModel.findOneAndUpdate({ _id: id }, updatePriceDto, { new: true }).populate('produto');
        }
        else {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui acesso a este ID.',
                dados: {}
            });
        }
    }
    async remove(id) {
        const preFilter = this.getPrefilter();
        await this.schemaModel.deleteOne(Object.assign({ _id: id }, preFilter));
        return {};
    }
    async bulkRemove(bulkRemoveDto) {
        const preFilter = this.getPrefilter();
        await this.schemaModel.deleteMany(Object.assign({ _id: {
                $in: bulkRemoveDto.ids
            } }, preFilter));
        return {};
    }
    async import(file) {
        return await this.pricesImport.import(file);
    }
    getPrefilter() {
        let preFilter = Object();
        const user = this.clsService.get('user');
        if (user.tipo_conta === 'gerente') {
            preFilter.id = {
                $in: user.responsavel_mercados
            };
        }
        else if (user.tipo_conta === 'operador') {
            if (user.responsavel_mercados.length > 0) {
                preFilter.id = {
                    $in: user.responsavel_mercados
                };
            }
        }
        return preFilter;
    }
    userHasAccessToId(supermarketId) {
        const user = this.clsService.get('user');
        if (user.tipo_conta === 'admin') {
            return true;
        }
        else if (user.tipo_conta === 'operador' && user.responsavel_mercados.length === 0) {
            return true;
        }
        else {
            return user.responsavel_mercados.includes(supermarketId);
        }
    }
};
PricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('precos')),
    __param(1, (0, mongoose_1.InjectModel)('produtos')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        nestjs_cls_1.ClsService,
        event_emitter_1.EventEmitter2,
        prices_import_1.PricesImport])
], PricesService);
exports.PricesService = PricesService;
//# sourceMappingURL=prices.service.js.map