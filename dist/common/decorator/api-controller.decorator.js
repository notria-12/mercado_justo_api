"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_1 = require("../../auth/roles");
function ApiController(apiTag, apiExtraModels, apiBearerAuth = false) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(apiTag), (0, swagger_1.ApiExtraModels)(...apiExtraModels), (0, swagger_1.ApiHeader)({
        name: 'X-App-Origem',
        description: 'Indica de onde a requisição foi feita.',
        required: false,
        schema: {
            default: roles_1.Apps.SWAGGER_MERCADO_JUSTO,
            enum: Object.keys(roles_1.Apps)
        }
    }), apiBearerAuth ? (0, swagger_1.ApiBearerAuth)() : () => { });
}
exports.ApiController = ApiController;
//# sourceMappingURL=api-controller.decorator.js.map