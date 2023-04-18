"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_import_1 = require("./products.import");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../schema");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
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
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, products_import_1.ProductsImport]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map