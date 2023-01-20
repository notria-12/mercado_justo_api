import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';
export declare class ResponseInterceptor<T> implements NestInterceptor {
    private readonly cls;
    constructor(cls: ClsService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    generateMessage(route: string, handler: string): string;
    handleData(context: ExecutionContext, handler: string, resData: any): any;
    orderKeysDescending(object: any): {};
}
