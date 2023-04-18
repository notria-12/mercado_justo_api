"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        if (typeof exception.getResponse() == 'object'
            && !Object.keys(exception.getResponse()).includes('statusCode')) {
            return response
                .status(status)
                .json(Object.assign(Object.assign({}, exception.getResponse()), { timestamp: new Date().toISOString() }));
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
            mensagem: exception.getResponse().error || exception.message,
            dados: exception.getResponse().message || {},
            timestamp: new Date().toISOString(),
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map