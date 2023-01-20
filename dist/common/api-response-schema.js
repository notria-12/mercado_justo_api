"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResSchema = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ApiResSchema = {
    apply: schema => ({
        schema: {
            type: 'object',
            properties: {
                mensagem: {
                    type: 'string',
                },
                dados: {
                    type: 'object',
                    $ref: (0, swagger_1.getSchemaPath)(schema),
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        }
    }),
    applyArr: schema => ({
        schema: {
            type: 'object',
            properties: {
                mensagem: {
                    type: 'string',
                },
                dados: {
                    type: 'array',
                    items: {
                        type: 'object',
                        $ref: (0, swagger_1.getSchemaPath)(schema),
                    }
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        }
    }),
    applyType: thisType => ({
        schema: {
            type: 'object',
            properties: {
                mensagem: {
                    type: 'string',
                },
                dados: {
                    type: thisType,
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        }
    })
};
//# sourceMappingURL=api-response-schema.js.map