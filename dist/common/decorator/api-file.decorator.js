"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiFile() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        description: 'Arquivo excel (xlsx).',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }));
}
exports.ApiFile = ApiFile;
//# sourceMappingURL=api-file.decorator.js.map