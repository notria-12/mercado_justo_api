"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const mongoose_1 = require("@nestjs/mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_cls_1 = require("nestjs-cls");
const global_plugin_module_1 = require("./mongoose-hooks/global-plugin.module");
const global_plugin_service_1 = require("./mongoose-hooks/global-plugin.service");
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("./response.interceptor");
const auth_module_1 = require("./auth/auth.module");
const log_module_1 = require("./log/log.module");
const products_module_1 = require("./products/products.module");
const prices_module_1 = require("./prices/prices.module");
const state_city_module_1 = require("./state-city/state-city.module");
const mail_module_1 = require("./mail/mail.module");
const token_module_1 = require("./token/token.module");
const access_module_1 = require("./access/access.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const problems_module_1 = require("./problems/problems.module");
const supermarkets_module_1 = require("./supermarkets/supermarkets.module");
const images_module_1 = require("./images/images.module");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const aws_sdk_1 = require("aws-sdk");
const categories_module_1 = require("./categories/categories.module");
const terms_use_module_1 = require("./terms-use/terms-use.module");
const faq_module_1 = require("./faq/faq.module");
const payments_module_1 = require("./payments/payments.module");
const public_products_module_1 = require("./public-products/public-products.module");
const public_supermarkets_module_1 = require("./public-supermarkets/public-supermarkets.module");
const public_prices_module_1 = require("./public-prices/public-prices.module");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
            }),
            nestjs_cls_1.ClsModule.register({
                global: true,
                middleware: { mount: true }
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService, globalPluginService) => configService.get('mongo')(globalPluginService),
                imports: [
                    config_1.ConfigModule,
                    global_plugin_module_1.GlobalPluginModule
                ],
                inject: [
                    config_1.ConfigService,
                    global_plugin_service_1.GlobalPluginService
                ],
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true
            }),
            nest_aws_sdk_1.AwsSdkModule.forRootAsync({
                defaultServiceOptions: {
                    useFactory: (configService) => ({
                        region: configService.get('aws.region'),
                        credentials: new aws_sdk_1.Credentials({
                            accessKeyId: configService.get('aws.accessKeyId'),
                            secretAccessKey: configService.get('aws.secretAccessKey')
                        }),
                    }),
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService]
                },
                services: [aws_sdk_1.S3],
            }),
            auth_module_1.AuthModule,
            log_module_1.LogModule,
            products_module_1.ProductsModule,
            prices_module_1.PricesModule,
            state_city_module_1.StateCityModule,
            mail_module_1.MailModule,
            token_module_1.TokenModule,
            access_module_1.AccessModule,
            dashboard_module_1.DashboardModule,
            problems_module_1.ProblemsModule,
            supermarkets_module_1.SupermarketsModule,
            images_module_1.ImagesModule,
            categories_module_1.CategoriesModule,
            terms_use_module_1.TermsUseModule,
            faq_module_1.FaqModule,
            payments_module_1.PaymentsModule,
            public_products_module_1.PublicProductsModule,
            public_supermarkets_module_1.PublicSupermarketsModule,
            public_prices_module_1.PublicPricesModule
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map