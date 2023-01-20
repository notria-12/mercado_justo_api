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
exports.ProblemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
const entities_1 = require("../auth/entities");
const nestjs_cls_1 = require("nestjs-cls");
let ProblemsService = class ProblemsService {
    constructor(schemaModel, clsService) {
        this.schemaModel = schemaModel;
        this.clsService = clsService;
    }
    async create(createProblemDto) {
        const exists = await this.schemaModel.exists(createProblemDto);
        if (exists) {
            return await this.schemaModel.findOneAndUpdate(createProblemDto, Object.assign(Object.assign({}, createProblemDto), { data_hora: new Date() }), { new: true });
        }
        else {
            const newProblem = new this.schemaModel(createProblemDto);
            return await newProblem.save();
        }
    }
    async findAll(query) {
        let preFilter = Object();
        const user = this.clsService.get('user');
        if (user.tipo_conta === 'cliente' || user.tipo_conta === 'gerente') {
            preFilter.usuario = user.userId;
        }
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '', '', preFilter);
    }
    async findOne(id) {
        let filter = Object({ _id: id });
        const user = this.clsService.get('user');
        if (user.tipo_conta === 'cliente' || user.tipo_conta === 'gerente') {
            filter.usuario = user.userId;
        }
        return await this.schemaModel.findOne(filter);
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
};
ProblemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('problemas')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_cls_1.ClsService])
], ProblemsService);
exports.ProblemsService = ProblemsService;
//# sourceMappingURL=problems.service.js.map