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
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const event_emitter_1 = require("@nestjs/event-emitter");
const common_2 = require("../common");
let AccessService = class AccessService {
    constructor(schemaModel) {
        this.schemaModel = schemaModel;
    }
    async handleAccessEvents(payload) {
        const newAccess = new this.schemaModel(payload);
        await newAccess.save();
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '');
    }
    async findOne(id) {
        return await this.schemaModel.findById(id);
    }
    async getAccesses() {
        return (await this.schemaModel.aggregate([
            {
                $facet: {
                    usuarios: [
                        { $match: { colecao: 'usuarios' } },
                        {
                            $lookup: {
                                from: 'usuarios',
                                localField: 'usuario',
                                foreignField: '_id',
                                as: 'usuario'
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    mes: { $month: '$data_hora' },
                                    ano: { $year: '$data_hora' },
                                },
                                acessos: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                mes: '$_id.mes',
                                ano: '$_id.ano',
                                acessos: 1,
                            }
                        },
                        { $sort: { ano: 1, mes: 1 } }
                    ],
                    produtos: [
                        { $match: { colecao: 'precos' } },
                        {
                            $lookup: {
                                from: 'precos',
                                localField: 'documento',
                                foreignField: '_id',
                                as: 'documento'
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    preco: '$documento',
                                    mes: { $month: '$data_hora' },
                                    ano: { $year: '$data_hora' },
                                },
                                acessos: { $sum: 1 }
                            }
                        },
                        { $sort: { '_id.ano': 1, '_id.mes': 1 } },
                        {
                            $group: {
                                _id: { preco: '$_id.preco' },
                                acessos: {
                                    $push: {
                                        mes: '$_id.mes',
                                        ano: '$_id.ano',
                                        total: { $sum: '$acessos' }
                                    }
                                }
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                acessos: 1,
                                preco: { $arrayElemAt: ['$_id.preco', 0] },
                            }
                        },
                        {
                            $lookup: {
                                from: 'produtos',
                                localField: 'preco.produto',
                                foreignField: '_id',
                                as: 'preco.produto'
                            }
                        },
                        { $unwind: '$preco.produto' },
                    ],
                    mercados: [
                        { $match: { colecao: 'mercados' } },
                        {
                            $lookup: {
                                from: 'mercados',
                                localField: 'documento',
                                foreignField: '_id',
                                as: 'documento'
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    mercado: '$documento',
                                    mes: { $month: '$data_hora' },
                                    ano: { $year: '$data_hora' },
                                },
                                acessos: { $sum: 1 }
                            }
                        },
                        { $sort: { '_id.ano': 1, '_id.mes': 1 } },
                        {
                            $group: {
                                _id: { mercado: '$_id.mercado' },
                                acessos: {
                                    $push: {
                                        mes: '$_id.mes',
                                        ano: '$_id.ano',
                                        total: { $sum: '$acessos' }
                                    }
                                }
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                acessos: 1,
                                mercado: { $arrayElemAt: ['$_id.mercado', 0] },
                            }
                        },
                    ]
                }
            },
        ]))[0];
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('access.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAccessDto]),
    __metadata("design:returntype", Promise)
], AccessService.prototype, "handleAccessEvents", null);
AccessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('acessos')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccessService);
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map