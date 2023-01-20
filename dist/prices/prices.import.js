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
exports.PricesImport = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const entities_1 = require("../auth/entities");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../common");
const schema_1 = require("../schema");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const xlsx = require("xlsx");
let PricesImport = class PricesImport extends common_2.ExcelImport {
    constructor(schemaModel, productsModel, clsService) {
        super(schemaModel);
        this.productsModel = productsModel;
        this.clsService = clsService;
        this.updatedPrices = [];
        this.updatedSupermarketsIds = [];
        this.fields = [
            {
                key: 'codigo_barras',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumber)(data)) {
                        return [String(data)];
                    }
                    else if ((0, class_validator_1.isString)(data)) {
                        if (data.split(';').length > 0) {
                            return data.split(';').map(barcode => barcode.trim());
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'preco',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumber)(data)) {
                        return this.toCash(data);
                    }
                    else {
                        return '';
                    }
                },
            },
            {
                key: 'id',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumber)(data)) {
                        return [data];
                    }
                    else if ((0, class_validator_1.isString)(data)) {
                        if (data.split(';').length > 0) {
                            return data.split(';')
                                .map(id => Number(id.trim()))
                                .filter(id => id > 0);
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
        ];
        this.assumption = [];
    }
    toValue(data) {
        return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
    toCash(data) {
        const value = String(data.toFixed(2)).replace('.', ',').trim();
        return `R$ ${value}`;
    }
    async import(uploadedFile) {
        this.user = this.clsService.get('user');
        this.loadFile(uploadedFile);
        for (const worksheet of this.excelFile.SheetNames) {
            this.setColumnNamesToFields(worksheet);
            const jsonRows = xlsx.utils.sheet_to_json(this.excelFile.Sheets[worksheet], {
                blankrows: false,
            });
            const bulk = this.schemaModel.collection.initializeUnorderedBulkOp();
            let sheetResult = [];
            for (const [i, row] of jsonRows.entries()) {
                let requiredDataArr = [];
                let requiredDataMissing = false;
                for (const field of this.fields) {
                    const rowKeys = Object.keys(row);
                    const key = rowKeys.includes(field.key)
                        ? field.key
                        : rowKeys.includes(field.alias)
                            ? field.alias
                            : null;
                    if (key) {
                        const value = field.dataTransform(this.clearData(row[key]));
                        if (typeof value === null && this.isFieldRequired(field, { worksheet, jsonRow: row })) {
                            requiredDataMissing = true;
                            const rowOffSetFromHeader = 2;
                            this.appendError(worksheet, i + rowOffSetFromHeader, field);
                        }
                        else {
                            requiredDataArr.push({ [field.key]: typeof value !== null ? value : '' });
                        }
                    }
                    else if (this.isFieldRequired(field, { worksheet, jsonRow: row })) {
                        requiredDataMissing = true;
                        const rowOffSetFromHeader = 2;
                        this.appendError(worksheet, i + rowOffSetFromHeader, field);
                    }
                }
                if (requiredDataMissing)
                    continue;
                this.appendSuccess(worksheet);
                sheetResult.push(Object.assign({}, ...requiredDataArr));
            }
            await this.loadProductsIds(sheetResult
                .map(row => row.codigo_barras)
                .reduce((acc, curr) => acc.concat(...curr), []));
            for (const row of sheetResult) {
                for (const id of row.id) {
                    if (!this.userHasAccessToId(id)) {
                        continue;
                    }
                    this.updatedSupermarketsIds.push(id);
                    for (const barcode of row.codigo_barras) {
                        const productId = this.getProductIdFromBarcode(barcode);
                        if (productId) {
                            bulk
                                .find({
                                id: id,
                                produto: productId,
                            })
                                .upsert()
                                .updateOne({
                                $set: {
                                    preco: row.preco,
                                    atualizado_em: new Date()
                                }
                            });
                            this.updatedPrices.push(productId);
                        }
                    }
                }
            }
            if (bulk.batches.length > 0) {
                await bulk.execute();
            }
            if (this.updatedSupermarketsIds.length > 0) {
                await this.schemaModel.updateMany({
                    id: {
                        $in: this.updatedSupermarketsIds,
                    },
                    produto: {
                        $nin: this.updatedPrices,
                    }
                }, {
                    preco: ''
                });
                this.updatedSupermarketsIds = [];
                this.updatedPrices = [];
            }
        }
        this.user = null;
        return Promise.resolve(this.getResult());
    }
    getProductIdFromBarcode(barcode) {
        for (const productId of this.productsIds) {
            for (const prodBarCode of productId.codigo_barras) {
                if (prodBarCode === barcode) {
                    return productId._id;
                }
            }
        }
        return null;
    }
    async loadProductsIds(barcodes) {
        this.productsIds = await this.productsModel.aggregate([
            {
                $match: {
                    codigo_barras: {
                        $in: barcodes
                    }
                }
            },
            {
                $project: {
                    codigo_barras: 1
                }
            }
        ]);
    }
    userHasAccessToId(supermarketId) {
        if (this.user.tipo_conta === 'admin') {
            return true;
        }
        else if (this.user.tipo_conta === 'operador' && this.user.responsavel_mercados.length === 0) {
            return true;
        }
        else {
            return this.user.responsavel_mercados.includes(supermarketId);
        }
    }
};
PricesImport = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('precos')),
    __param(1, (0, mongoose_1.InjectModel)('produtos')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        nestjs_cls_1.ClsService])
], PricesImport);
exports.PricesImport = PricesImport;
//# sourceMappingURL=prices.import.js.map