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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const bcrypt = require("bcrypt");
const common_2 = require("../common");
const dto_1 = require("../auth/dto");
const entities_1 = require("../auth/entities");
const nestjs_cls_1 = require("nestjs-cls");
const users_import_1 = require("./users.import");
const signature_schema_1 = require("../schema/signature.schema");
let UsersService = class UsersService {
    constructor(schemaModel, signatureModel, clsService, usersImport) {
        this.schemaModel = schemaModel;
        this.signatureModel = signatureModel;
        this.clsService = clsService;
        this.usersImport = usersImport;
    }
    async createApp(createUserDto) {
        const exists = await this.schemaModel.findOne({
            $or: [
                { email: createUserDto.email },
                { cpf: createUserDto.cpf },
                { telefone: createUserDto.telefone }
            ]
        });
        if (exists) {
            throw new common_1.ConflictException({
                mensagem: 'E-mail e/ou CPF ou telefone já utilizado.',
                dados: {}
            });
        }
        const newUser = new this.schemaModel(Object.assign(Object.assign({}, createUserDto), { permissoes: ["precos", "produtos", "mercados", "usuarios"], tipo_conta: 'cliente' }));
        const _a = (await (await newUser.save()).populate('mercado')).toObject(), { senha } = _a, user = __rest(_a, ["senha"]);
        const createSignature = new this.signatureModel({ id_pagamento: '', status: true, data_expiracao: Date.now() + (1000 * 60 * 60 * 24 * 7), ultima_assinatura: Date.now(), id_usuario: user._id, tipo_pagamento: signature_schema_1.tipo[2] });
        createSignature.save();
        return user;
    }
    async create(createUserDto) {
        const exists = await this.schemaModel.findOne({
            $or: [
                { email: createUserDto.email },
                { cpf: createUserDto.cpf }
            ]
        });
        if (exists) {
            throw new common_1.ConflictException({
                mensagem: 'E-mail e/ou CPF já utilizado.',
                dados: {}
            });
        }
        const accountType = this.clsService.get('user').tipo_conta;
        const newUser = new this.schemaModel(Object.assign(Object.assign({}, createUserDto), { senha: bcrypt.hashSync(createUserDto.senha, bcrypt.genSaltSync()), responsavel_mercados: accountType !== 'admin'
                ? []
                : accountType === 'admin' && createUserDto.responsavel_mercados
                    ? createUserDto.responsavel_mercados
                    : [], permissoes: accountType !== 'admin'
                ? []
                : accountType === 'admin' && createUserDto.permissoes
                    ? createUserDto.permissoes
                    : [], tipo_conta: accountType !== 'admin'
                ? 'cliente'
                : accountType === 'admin' && createUserDto.tipo_conta
                    ? createUserDto.tipo_conta
                    : 'cliente' }));
        const _a = (await (await newUser.save()).populate('mercado')).toObject(), { senha } = _a, user = __rest(_a, ["senha"]);
        return user;
    }
    async createGoogle(createUser) {
        delete createUser.id_token;
        const user = new this.schemaModel(Object.assign({}, createUser));
        return await user.save();
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '-senha', 'mercado');
    }
    async findOne(id) {
        const _a = (await this.schemaModel.findById(id).populate('mercado')).toObject(), { senha } = _a, user = __rest(_a, ["senha"]);
        return user;
    }
    async findMe() {
        const userId = this.clsService.get('user').userId;
        const _a = (await this.schemaModel.findById(userId).populate('mercado')).toObject(), { senha } = _a, user = __rest(_a, ["senha"]);
        return user;
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
    async findByEmailInternal(email) {
        return await this.schemaModel.findOne({ email });
    }
    async findByPhoneInternal(telefone) {
        return await this.schemaModel.findOne({ telefone });
    }
    async findByCPFInternal(cpf) {
        console.log(cpf);
        return await this.schemaModel.findOne({ cpf });
    }
    async findByEmailExternal(email) {
        return await this.schemaModel.exists({ email });
    }
    async findByCpfExternal(cpf) {
        return await this.schemaModel.exists({ cpf });
    }
    async findOneByGoogleData(google_id, email) {
        return this.schemaModel.findOne({
            $or: [
                { email },
                { google_id }
            ]
        });
    }
    async update(id, updateUserDto) {
        if (updateUserDto.email) {
            const emailExists = await this.schemaModel.findOne({ email: updateUserDto.email });
            if (emailExists && emailExists._id != id) {
                throw new common_1.ConflictException({ mensagem: 'Este email já está sendo usado.', dados: {} });
            }
        }
        if (updateUserDto.cpf) {
            const cpfExists = await this.schemaModel.findOne({ cpf: updateUserDto.cpf });
            if (cpfExists && cpfExists._id != id) {
                throw new common_1.ConflictException({ mensagem: 'Este CPF já está sendo usado.', dados: {} });
            }
        }
        if (updateUserDto.telefone) {
            const phoneExists = await this.schemaModel.findOne({ telefone: updateUserDto.telefone });
            if (phoneExists && phoneExists._id != id) {
                throw new common_1.ConflictException({ mensagem: 'Este telefone já está sendo usado.', dados: {} });
            }
        }
        if (updateUserDto.senha) {
            const hash = bcrypt.hashSync(updateUserDto.senha, bcrypt.genSaltSync());
            updateUserDto.senha = hash;
        }
        const user = this.clsService.get('user');
        if (user.tipo_conta !== 'admin') {
            id = user.userId;
            delete updateUserDto.permissoes;
            delete updateUserDto.tipo_conta;
        }
        const _a = (await this.schemaModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true }).populate('mercado')).toObject(), { senha } = _a, updatedUser = __rest(_a, ["senha"]);
        return updatedUser;
    }
    async updatePasswordByEmail(email, password) {
        return await this.schemaModel.updateOne({ email }, {
            senha: bcrypt.hashSync(password, bcrypt.genSaltSync())
        });
    }
    async updateLastAccess(id) {
        return await this.schemaModel.findOneAndUpdate({ _id: id }, { ultimo_acesso: new Date() }, { new: true });
    }
    async remove(id) {
        const userPayload = this.clsService.get('user');
        if (userPayload.tipo_conta !== 'admin') {
            id = userPayload.userId;
        }
        await this.schemaModel.deleteOne({ _id: id });
        return {};
    }
    async import(file, query) {
        this.usersImport.setAccountType(query.tipo_conta);
        return await this.usersImport.import(file);
    }
    async getPlataformData() {
        return (await this.schemaModel.aggregate([
            {
                $facet: {
                    assinaturas: [
                        {
                            $match: {
                                data_assinatura: { $exists: true },
                                status_assinante: true
                            }
                        },
                        { $unset: 'senha' },
                        {
                            $group: {
                                _id: {
                                    mes: { $month: '$data_assinatura' },
                                    ano: { $year: '$data_assinatura' },
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                mes: '$_id.mes',
                                ano: '$_id.ano',
                                total: 1
                            }
                        },
                        { $sort: { ano: 1, mes: 1 } }
                    ],
                    cadastros: [
                        { $unset: 'senha' },
                        {
                            $group: {
                                _id: {
                                    mes: { $month: '$data_cadastro' },
                                    ano: { $year: '$data_cadastro' },
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                mes: '$_id.mes',
                                ano: '$_id.ano',
                                total: 1
                            }
                        },
                        { $sort: { ano: 1, mes: 1 } }
                    ],
                    cancelamentos: [
                        {
                            $match: {
                                data_assinatura_cancelada: { $exists: true },
                                status_assinante: false
                            }
                        },
                        { $unset: 'senha' },
                        {
                            $group: {
                                _id: {
                                    mes: { $month: '$data_assinatura_cancelada' },
                                    ano: { $year: '$data_assinatura_cancelada' },
                                },
                                total: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                mes: '$_id.mes',
                                ano: '$_id.ano',
                                total: 1
                            }
                        },
                        { $sort: { ano: 1, mes: 1 } }
                    ],
                },
            }
        ]))[0];
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('usuarios')),
    __param(1, (0, mongoose_1.InjectModel)('assinaturas')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        nestjs_cls_1.ClsService,
        users_import_1.UsersImport])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map