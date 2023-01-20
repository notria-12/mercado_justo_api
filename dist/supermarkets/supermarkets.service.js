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
exports.SupermarketsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
const supermarkets_import_1 = require("./supermarkets.import");
const entities_1 = require("../auth/entities");
const nestjs_cls_1 = require("nestjs-cls");
const event_emitter_1 = require("@nestjs/event-emitter");
let SupermarketsService = class SupermarketsService {
    constructor(schemaModel, clsService, eventEmitter, supermarketsImport) {
        this.schemaModel = schemaModel;
        this.clsService = clsService;
        this.eventEmitter = eventEmitter;
        this.supermarketsImport = supermarketsImport;
    }
    async create(createSupermarketDto) {
        if (typeof createSupermarketDto.ordem === 'number') {
            if (!(await this.isSupermarketPosAvailable(createSupermarketDto))) {
                throw new common_1.BadRequestException({
                    mensagem: 'Já existe um mercado nesta ordem.',
                    dados: {}
                });
            }
        }
        const exists = await this.schemaModel.exists({ cnpj: createSupermarketDto.cnpj });
        if (exists && !!createSupermarketDto.cnpj) {
            throw new common_1.BadRequestException({
                mensagem: 'Já existe um mercado com este CNPJ.',
                dados: {}
            });
        }
        else {
            const newSupermarket = new this.schemaModel(createSupermarketDto);
            return await (await newSupermarket.save()).populate({
                path: 'responsavel',
                select: '-senha'
            });
        }
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '', {
            path: 'responsavel',
            select: '-senha'
        });
    }
    async findOne(id) {
        this.eventEmitter.emit('access.mercados', {
            documento: id,
            usuario: this.clsService.get('user').userId || null,
            colecao: 'mercados'
        });
        return await this.schemaModel.findById(id).populate({
            path: 'responsavel',
            select: '-senha'
        });
    }
    async getList(query) {
        const preFilter = this.getPrefilter();
        const searchObj = (0, common_2.generateSearchObject)(query);
        if (Object.keys(searchObj).length === 0) {
            return await this.schemaModel.aggregate([
                { $match: preFilter },
                {
                    $group: {
                        _id: {
                            nome: '$nome',
                        },
                    }
                },
                {
                    $sort: {
                        '_id.nome': 1,
                    }
                },
                {
                    $project: {
                        _id: 0,
                        value: '$_id.nome',
                        text: '$_id.nome'
                    }
                }
            ]);
        }
        else {
            return await this.schemaModel.aggregate([
                { $match: searchObj },
                {
                    $group: {
                        _id: {
                            id: '$id',
                        },
                    }
                },
                {
                    $sort: {
                        '_id.id': 1,
                    }
                },
                {
                    $project: {
                        _id: 0,
                        value: '$_id.id',
                        text: '$_id.id'
                    }
                }
            ]);
        }
    }
    async update(id, updateSupermarketDto) {
        if (typeof updateSupermarketDto.ordem === 'number') {
            if (!(await this.isSupermarketPosAvailable(updateSupermarketDto, id))) {
                throw new common_1.BadRequestException({
                    mensagem: 'Já existe um mercado nesta ordem.',
                    dados: {}
                });
            }
        }
        const exists = await this.schemaModel.exists({ cnpj: updateSupermarketDto.cnpj });
        if (exists && updateSupermarketDto.cnpj) {
            throw new common_1.BadRequestException({
                mensagem: 'Já existe um mercado com este CNPJ.',
                dados: {}
            });
        }
        return await this.schemaModel.findOneAndUpdate({ _id: id }, updateSupermarketDto, { new: true }).populate({
            path: 'responsavel',
            select: '-senha'
        });
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
        return await this.supermarketsImport.import(file);
    }
    getPrefilter() {
        let preFilter = Object();
        const user = this.clsService.get('user');
        if (user && user.tipo_conta === 'gerente') {
            preFilter.id = {
                $in: user.responsavel_mercados
            };
        }
        else if (user && user.tipo_conta === 'operador') {
            if (user.responsavel_mercados.length > 0) {
                preFilter.id = {
                    $in: user.responsavel_mercados
                };
            }
        }
        return preFilter;
    }
    async isSupermarketPosAvailable(supermarket, id = null) {
        if (id) {
            return !(await this.schemaModel.exists({
                _id: { $ne: id },
                cidade: supermarket.cidade,
                ordem: supermarket.ordem
            }));
        }
        else {
            return !(await this.schemaModel.exists({
                cidade: supermarket.cidade,
                ordem: supermarket.ordem
            }));
        }
    }
};
SupermarketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('mercados')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_cls_1.ClsService,
        event_emitter_1.EventEmitter2,
        supermarkets_import_1.SupermarketsImport])
], SupermarketsService);
exports.SupermarketsService = SupermarketsService;
//# sourceMappingURL=supermarkets.service.js.map