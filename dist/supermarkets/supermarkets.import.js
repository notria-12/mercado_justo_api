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
exports.SupermarketsImport = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../common");
const schema_1 = require("../schema");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const xlsx = require("xlsx");
let SupermarketsImport = class SupermarketsImport extends common_2.ExcelImport {
    constructor(schemaModel) {
        super(schemaModel);
        this.fields = [
            {
                alias: 'mercado',
                key: 'nome',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data.trim();
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'id',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumber)(data) && (0, class_validator_1.min)(data, 1)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'latitude',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumberString)(data)) {
                        return Number(data);
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'longitude',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumberString)(data)) {
                        return Number(data);
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'site',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isURL)(data)) {
                        return data.trim();
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'cnpj',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data) && (0, common_2.CNPJ)(data)) {
                        return data.trim();
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'telefone',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isPhoneNumber)(data, 'BR')) {
                        return data.trim();
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'endereco',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data.trim();
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
                        return data.trim();
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
            },
            {
                key: 'ordem',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isNumber)(data)) {
                        return data;
                    }
                    else {
                        return null;
                    }
                },
            },
        ];
        this.assumption = [];
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
                const exists = await this.schemaModel.exists({ cnpj: row.cnpj });
                if (exists && row.cnpj) {
                    bulk
                        .find({ cnpj: row.cnpj })
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
    toValueUpperCase(data) {
        return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    }
};
SupermarketsImport = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('mercados')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SupermarketsImport);
exports.SupermarketsImport = SupermarketsImport;
//# sourceMappingURL=supermarkets.import.js.map