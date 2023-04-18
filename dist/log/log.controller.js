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
exports.LogController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const log_service_1 = require("./log.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
let LogController = class LogController {
    constructor(logService) {
        this.logService = logService;
    }
    findAll(query) {
        return this.logService.findAll(query);
    }
    findOne(id) {
        return this.logService.findOne(id);
    }
    remove(id) {
        return this.logService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.Log)),
    (0, roles_1.Roles)(roles_1.Role.Admin),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.Log)),
    (0, roles_1.Roles)(roles_1.Role.Admin),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, roles_1.Roles)(roles_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "remove", null);
LogController = __decorate([
    (0, common_2.ApiController)('Logs', [schema_1.Log], true),
    (0, common_1.Controller)('logs'),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogController);
exports.LogController = LogController;
//# sourceMappingURL=log.controller.js.map