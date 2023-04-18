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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalPluginService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const entities_1 = require("../auth/entities");
const mongoose = require("mongoose");
const schema_1 = require("../schema");
let GlobalPluginService = class GlobalPluginService {
    constructor(clsService) {
        this.clsService = clsService;
    }
    setPlugin(logModel) {
        const globalPluginService = this;
        return function (schema) {
            schema.pre('save', function () {
                globalPluginService.logMiddleware(this, 'criar', logModel);
            });
            schema.pre(['updateOne', 'findOneAndUpdate'], function () {
                globalPluginService.logMiddleware(this, 'atualizar', logModel);
            });
            schema.pre('deleteOne', function () {
                globalPluginService.logMiddleware(this, 'remover', logModel);
            });
            schema.pre('deleteMany', function () {
                globalPluginService.logMiddleware(this, 'remover-muitos', logModel);
            });
        };
    }
    logMiddleware(doc, action, logModel, collection = '') {
        const userPayload = this.clsService.get('user');
        const ip = this.clsService.get('ip');
        if (doc instanceof mongoose.Document) {
            logModel.collection.insertOne({
                acao: action,
                colecao: doc.collection.name,
                usuario: userPayload && userPayload.userId
                    ? mongoose.Types.ObjectId(userPayload.userId)
                    : null,
                documento: mongoose.Types.ObjectId(doc.id),
                data: new Date(),
                ip
            });
        }
        else if (doc instanceof mongoose.Query) {
            if (action === 'remover-muitos') {
                const ids = doc._conditions._id['$in'];
                for (const id of ids) {
                    logModel.collection.insertOne({
                        acao: action,
                        colecao: doc._collection.collection.name,
                        usuario: userPayload && userPayload.userId
                            ? mongoose.Types.ObjectId(userPayload.userId)
                            : null,
                        documento: mongoose.Types.ObjectId(id),
                        data: new Date(),
                        ip
                    });
                }
            }
            else if (action === 'atualizar') {
                logModel.collection.insertOne({
                    acao: action,
                    colecao: doc._collection.collection.name,
                    usuario: userPayload && userPayload.userId
                        ? mongoose.Types.ObjectId(userPayload.userId)
                        : null,
                    documento: mongoose.Types.ObjectId(doc._conditions._id),
                    data: new Date(),
                    ip
                });
            }
        }
        else {
            if (action === 'criar-muitos') {
                for (const d of doc) {
                    logModel.collection.insertOne({
                        acao: action,
                        colecao: collection,
                        usuario: userPayload && userPayload.userId
                            ? mongoose.Types.ObjectId(userPayload.userId)
                            : null,
                        documento: d._id,
                        data: new Date(),
                        ip
                    });
                }
            }
        }
    }
};
GlobalPluginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService])
], GlobalPluginService);
exports.GlobalPluginService = GlobalPluginService;
//# sourceMappingURL=global-plugin.service.js.map