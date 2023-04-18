"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesModule = void 0;
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const images_controller_1 = require("./images.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../schema");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
let ImagesModule = class ImagesModule {
};
ImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'imagens', schema: schema_1.ImageSchema },
                { name: 'produtos', schema: schema_1.ProductSchema },
                { name: 'mercados', schema: schema_1.SupermarketSchema }
            ]),
            platform_express_1.MulterModule.registerAsync({
                useFactory: async (configService) => {
                    return {
                        storage: configService.get('multer').storage,
                        fileFilter: function (req, file, cb) {
                            const allowedTypes = ['image/png', 'image/jpeg'];
                            if (allowedTypes.includes(file.mimetype)) {
                                cb(null, true);
                            }
                            else {
                                cb(new common_1.BadRequestException({
                                    message: 'Os tipos permitidos são .png e .jpg',
                                    data: {}
                                }), false);
                            }
                        },
                    };
                },
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService]
            }),
            config_1.ConfigModule,
        ],
        controllers: [images_controller_1.ImagesController],
        providers: [images_service_1.ImagesService]
    })
], ImagesModule);
exports.ImagesModule = ImagesModule;
//# sourceMappingURL=images.module.js.map