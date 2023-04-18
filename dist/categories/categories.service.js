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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
let CategoriesService = class CategoriesService {
    constructor(schemaModel) {
        this.schemaModel = schemaModel;
    }
    async create(createCategoryDto) {
        const newCategory = new this.schemaModel(createCategoryDto);
        return await newCategory.save();
    }
    async findAll(query) {
        return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '', {
            path: 'pai',
            populate: {
                path: 'pai'
            }
        });
    }
    async findMainCatergories() {
        return await this.schemaModel.find({ pai: null });
    }
    async findSecondaryCatergories(id) {
        return await this.schemaModel.find({ pai: id });
    }
    async findOne(id) {
        return await this.schemaModel.findById(id).populate({
            path: 'pai',
            populate: {
                path: 'pai'
            }
        });
    }
    async update(id, updateCategoryDto) {
        return await this.schemaModel.findOneAndUpdate({ _id: id }, updateCategoryDto, { new: true }).populate({
            path: 'pai',
            populate: {
                path: 'pai'
            }
        });
    }
    async remove(id) {
        const subCategories_1 = await this.schemaModel.find({ pai: id });
        const subCategories_2 = await this.schemaModel.find({
            pai: {
                $in: subCategories_1.map(sub => sub._id)
            }
        });
        const categoriesIds = [
            ...subCategories_1.map(sub => sub._id),
            ...subCategories_2.map(sub => sub._id),
            id
        ];
        if (categoriesIds) {
            return await this.schemaModel.deleteMany({
                _id: {
                    $in: categoriesIds
                }
            });
        }
        return {};
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('categorias')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map