"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../schema");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const public_products_controller_1 = require("./public-products.controller");
const public_products_service_1 = require("./public-products.service");
let PublicProductsModule = class PublicProductsModule {
};
PublicProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'produtos', schema: schema_1.ProductSchema }
            ]),
            platform_express_1.MulterModule.registerAsync({
                useFactory: async (configService) => configService.get('multer'),
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService]
            }),
        ],
        controllers: [public_products_controller_1.PublicProductsController],
        providers: [public_products_service_1.PublicProductsService]
    })
], PublicProductsModule);
exports.PublicProductsModule = PublicProductsModule;
//# sourceMappingURL=public-products.module.js.map