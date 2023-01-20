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
exports.UsersImport = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../common");
const schema_1 = require("../schema");
const mongoose_2 = require("mongoose");
const is_cpf_decorator_1 = require("../common/decorator/is-cpf.decorator");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const xlsx = require("xlsx");
let UsersImport = class UsersImport extends common_2.ExcelImport {
    constructor(schemaModel) {
        super(schemaModel);
        this.fields = [
            {
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
                alias: 'usuario_cpf',
                key: 'cpf',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        if ((0, is_cpf_decorator_1.CPF)(data.trim())) {
                            return data.trim();
                        }
                        return null;
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                alias: 'e-mail',
                key: 'email',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        if ((0, class_validator_1.isEmail)(data.trim())) {
                            return data.trim();
                        }
                        return null;
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                alias: 'id',
                key: 'responsavel_mercados',
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
                        return null;
                    }
                    else {
                        return null;
                    }
                },
            },
            {
                key: 'telefone',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        if ((0, class_validator_1.isPhoneNumber)(data.trim(), 'BR')) {
                            return data.trim();
                        }
                        return null;
                    }
                    else {
                        return null;
                    }
                },
                required: (rfObject) => {
                    return this.accountType == 'operador'
                        ? true
                        : false;
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
                key: 'orientacao',
                dataTransform: (data) => (0, class_validator_1.isIn)(this.toValueLowerCase(data), schema_1.orientacao) ? this.toValueLowerCase(data) : null,
            },
            {
                key: 'idade',
                dataTransform: (data) => (0, class_validator_1.isNumber)(data) && (0, class_validator_1.min)(data, 18) ? data : null,
            },
            {
                key: 'senha',
                dataTransform: (data) => {
                    if (data) {
                        return bcrypt.hashSync(String(data).trim(), bcrypt.genSaltSync());
                    }
                    else {
                        return null;
                    }
                },
                required: true,
            },
            {
                key: 'permissoes',
                dataTransform: (data) => {
                    if ((0, class_validator_1.isString)(data)) {
                        return data.split(';')
                            .filter(permission => (0, class_validator_1.isIn)(this.toPermissionValue(permission), schema_1.permissoes))
                            .map(permission => this.toPermissionValue(permission));
                    }
                    else {
                        return null;
                    }
                },
            },
        ];
        this.assumption = [
            {
                key: 'tipo_conta',
                dataTransform: (worksheetName) => {
                    if (this.accountType && (0, class_validator_1.isIn)(this.accountType, schema_1.tipoConta)) {
                        return this.accountType;
                    }
                    else {
                        return null;
                    }
                },
                required: true
            }
        ];
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
                const mongoData = [...requiredDataArr, ...assumptionDataArr]
                    .reduce((obj, item) => Object.assign(obj, item, {}));
                sheetResult.push(mongoData);
            }
            for (const row of sheetResult) {
                const exists = await this.schemaModel.findOne({
                    $or: [
                        { email: row.email },
                        { cpf: row.cpf }
                    ]
                });
                if (exists) {
                    bulk
                        .find({
                        $or: [
                            { email: row.email },
                            { cpf: row.cpf }
                        ]
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
    setAccountType(accountType) {
        this.accountType = accountType;
    }
    toValueLowerCase(data) {
        return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    }
    toValueUpperCase(data) {
        return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
    }
    toPermissionValue(data) {
        const spaceOrPrepositions = /(\sd[a-zA-Z]\s|\s|\s?\/\s?)/gi;
        let noAccents = this.toValueLowerCase(data);
        return this.clearData(noAccents.replace(spaceOrPrepositions, '_'));
    }
};
UsersImport = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('usuarios')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersImport);
exports.UsersImport = UsersImport;
//# sourceMappingURL=users.import.js.map