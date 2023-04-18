"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const awsServerlessExpress = require("aws-serverless-express");
const express = require("express");
const common_1 = require("@nestjs/common");
const helmet = require("helmet");
const http_exception_filter_1 = require("./http-exception.filter");
const body_parser_1 = require("body-parser");
let cachedServer;
async function bootstrapServer() {
    const expressApp = express();
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.use((0, body_parser_1.json)({ limit: '10mb' }));
    app.use(helmet());
    app.enableCors({
        exposedHeaders: [
            'X-Total-Count',
            'X-Total-Pages',
            'X-App-Origem'
        ]
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('mercado-justo/api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1'
    });
    await app.init();
    return awsServerlessExpress.createServer(expressApp);
}
const handler = async (event, context) => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
        .promise;
};
exports.handler = handler;
//# sourceMappingURL=index.js.map