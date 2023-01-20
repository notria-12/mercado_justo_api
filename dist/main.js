"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./http-exception.filter");
const helmet = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, body_parser_1.json)({ limit: '50mb' }));
    app.use(helmet());
    app.enableCors({
        exposedHeaders: [
            'X-Total-Count',
            'X-Total-Pages'
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
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mercado Justo')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('services/docs', app, document, {
        customSiteTitle: 'Documentação Mercado Justo',
        swaggerOptions: {
            docExpansion: 'none',
            filter: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        }
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map