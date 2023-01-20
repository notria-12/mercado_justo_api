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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
let FaqService = class FaqService {
    constructor(schemaModel) {
        this.schemaModel = schemaModel;
    }
    async create(createFaqDto) {
        const newFaq = new this.schemaModel(createFaqDto);
        return await newFaq.save();
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query);
    }
    async findOne(id) {
        return await this.schemaModel.findById(id);
    }
    async update(id, updateFaqDto) {
        return await this.schemaModel.findOneAndUpdate({ _id: id }, updateFaqDto, { new: true });
    }
    async remove(id) {
        await this.schemaModel.deleteOne({ _id: id });
        return {};
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('perguntas-frequentes')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map