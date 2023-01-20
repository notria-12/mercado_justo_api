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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let TokenService = class TokenService {
    constructor(schemaModel, usersService, configService) {
        this.schemaModel = schemaModel;
        this.usersService = usersService;
        this.configService = configService;
        this.tokenExpiresIn = this.configService.get('token.expiresIn');
    }
    async create(createTokenDto) {
        const user = await this.usersService.findByEmailInternal(createTokenDto.email);
        if (user) {
            const tokenString = this.generateToken();
            const token = new this.schemaModel(Object.assign(Object.assign({}, createTokenDto), { token: bcrypt.hashSync(tokenString, bcrypt.genSaltSync()) }));
            token.save();
            return tokenString;
        }
        else {
            return false;
        }
    }
    async validate(email, token) {
        const tokenDocument = await this.schemaModel
            .findOne({ email })
            .sort({ _id: 'desc' });
        if (tokenDocument) {
            const isTokenValid = this.isTokenValid(tokenDocument, token);
            if (isTokenValid) {
                await this.schemaModel.updateOne({ _id: tokenDocument._id }, { usado: true });
            }
            return isTokenValid;
        }
        else {
            return false;
        }
    }
    async findAll() {
        return await this.schemaModel.find();
    }
    async findOne(id) {
        return await this.schemaModel.findById(id);
    }
    async remove(id) {
        await this.schemaModel.deleteOne({ _id: id });
        return {};
    }
    generateToken() {
        const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const tokenLength = this.configService.get('token.length');
        let token = '';
        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.round(Math.random() * (possibleChars.length - 1));
            token += possibleChars[randomIndex];
        }
        return token;
    }
    isTokenValid(tokenDocument, tokenString) {
        return tokenDocument
            && tokenDocument.data_criado > new Date(Date.now() - this.tokenExpiresIn)
            && tokenDocument.usado == false
            && bcrypt.compareSync(tokenString, tokenDocument.token);
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('tokens')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        config_1.ConfigService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map