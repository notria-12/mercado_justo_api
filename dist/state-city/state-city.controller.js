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
exports.StateCityController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const state_city_service_1 = require("./state-city.service");
const schema_1 = require("../schema");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
let StateCityController = class StateCityController {
    constructor(stateCityService) {
        this.stateCityService = stateCityService;
    }
    findAllStates() {
        return this.stateCityService.findAllStates();
    }
    findAllCitiesByState(stateOrInitials) {
        return this.stateCityService.findAllCitiesByState(stateOrInitials);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.State)),
    (0, common_1.Get)('estados'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StateCityController.prototype, "findAllStates", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.City)),
    (0, common_1.Get)(':estado/cidades'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StateCityController.prototype, "findAllCitiesByState", null);
StateCityController = __decorate([
    (0, common_2.ApiController)('Estado / Cidade', [schema_1.State, schema_1.City], true),
    (0, common_2.Public)(),
    (0, common_1.Controller)('estado-cidade'),
    __metadata("design:paramtypes", [state_city_service_1.StateCityService])
], StateCityController);
exports.StateCityController = StateCityController;
//# sourceMappingURL=state-city.controller.js.map