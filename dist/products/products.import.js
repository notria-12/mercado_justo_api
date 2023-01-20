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
exports.ProductsImport = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../common");
const schema_1 = require("../schema");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const xlsx = require("xlsx");
let ProductsImport = class ProductsImport extends common_2.ExcelImport {
    constructor(schemaModel) {
        super(schemaModel);
        this.fields = [
            {
                key: 'descricao',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
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
                key: 'categoria_1',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'categoria_2',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'categoria_3',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'unidade',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data) && schema_1.unidade.includes(this.toValueLowerCase(data))) {
                        return this.toValueLowerCase(data);
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'cidade',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'uf',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data) && schema_1.uf.includes(this.toValueUpperCase(data))) {
                        return this.toValueUpperCase(data);
                    }
                    else {
                        return null;
                    }
                },
            }
        ];
        this.assumption = [];
    }
    toValueUpperCase(data) {
        return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    }
    toValueLowerCase(data) {
        return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    }
    async import(uploadedFile) {
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
                let assumptionDataArr = [];
                for (const field of this.assumption) {
                    const value = field.dataTransform(worksheet);
                    if (this.isFieldRequired(field, { worksheet, jsonRow: row }) && !value) {
                        requiredDataMissing = true;
                        this.appendError(worksheet, 0, field, true);
                    }
                    else {
                        assumptionDataArr.push({ [field.key]: value ? value : '' });
                    }
                }
                if (requiredDataMissing)
                    continue;
                this.appendSuccess(worksheet);
                sheetResult.push(Object.assign({}, ...requiredDataArr));
            }
            for (const row of sheetResult) {
                const exists = await this.schemaModel.exists({
                    codigo_barras: {
                        $in: row.codigo_barras,
                    },
                    cidade: row.cidade
                });
                if (exists) {
                    bulk
                        .find({
                        codigo_barras: {
                            $in: row.codigo_barras,
                        },
                        cidade: row.cidade
                    })
                        .updateOne({ $set: row });
                }
                else {
                    bulk.insert(row);
                }
            }
            if (bulk.batches.length > 0) {
                await bulk.execute();
            }
        }
        return Promise.resolve(this.getResult());
    }
};
ProductsImport = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('produtos')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsImport);
exports.ProductsImport = ProductsImport;
//# sourceMappingURL=products.import.js.map