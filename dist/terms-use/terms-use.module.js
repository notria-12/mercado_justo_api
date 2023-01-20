"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsUseModule = void 0;
const common_1 = require("@nestjs/common");
const terms_use_service_1 = require("./terms-use.service");
const terms_use_controller_1 = require("./terms-use.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../schema");
let TermsUseModule = class TermsUseModule {
};
TermsUseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'termos-uso', schema: schema_1.TermsUseSchema },
            ]),
        ],
        controllers: [terms_use_controller_1.TermsUseController],
        providers: [terms_use_service_1.TermsUseService]
    })
], TermsUseModule);
exports.TermsUseModule = TermsUseModule;
//# sourceMappingURL=terms-use.module.js.map