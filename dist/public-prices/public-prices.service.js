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
exports.PublicPricesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
let PublicPricesService = class PublicPricesService {
    constructor(schemaModel) {
        this.schemaModel = schemaModel;
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
        let newPrices = [];
        for (let index = 0; index < ordenedPrices.length; index++) {
            let auxPrices = [];
            for (let marketId of marketsIds) {
                let priceByMarket = ordenedPrices[index].filter((price) => {
                    return price.id == marketId;
                });
                auxPrices.push(priceByMarket[0]);
            }
            newPrices[index] = auxPrices;
        }
        return newPrices;
    }
};
PublicPricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('precos')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PublicPricesService);
exports.PublicPricesService = PublicPricesService;
//# sourceMappingURL=public-prices.service.js.map