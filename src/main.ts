import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb'}));
  app.use(helmet());
  app.enableCors({
    exposedHeaders: [
      'X-Total-Count',
      'X-Total-Pages'
    ]
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('mercado-justo/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });
  const config = new DocumentBuilder()
    .setTitle('Mercado Justo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('services/docs', app, document, {
    customSiteTitle: 'Documentação Mercado Justo',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    }
  });
  await app.listen(3000);
}
bootstrap();
