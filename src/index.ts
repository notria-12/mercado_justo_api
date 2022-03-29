import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { ValidationPipe, VersioningType} from '@nestjs/common';
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './http-exception.filter';
import { json } from 'body-parser';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.use(json({ limit: '10mb'}));
  app.use(helmet());
  app.enableCors({
    exposedHeaders: [
      'X-Total-Count',
      'X-Total-Pages',
      'X-App-Origem'
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
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer()
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
      .promise;
};