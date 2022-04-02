import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (
      typeof exception.getResponse() == 'object'
      && !Object.keys(exception.getResponse()).includes('statusCode')
    ) {
      return response
        .status(status)
        .json({
          ...exception.getResponse() as object,
          timestamp: new Date().toISOString(),
        });
    }
     else if (status == 401) {
      return response
        .status(status)
        .json({
          mensagem: 'Não autorizado.',
          dados: {},
          timestamp: new Date().toISOString(),
        });
    }

    return response
      .status(status)
      .json({
        mensagem: (exception.getResponse() as any).error || exception.message,
        dados: (exception.getResponse() as any).message || {},
        timestamp: new Date().toISOString(),
      });
  }
}