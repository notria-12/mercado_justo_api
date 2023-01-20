"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPayload = void 0;
const openapi = require("@nestjs/swagger");
const schema_1 = require("../../schema");
const swagger_1 = require("@nestjs/swagger");
class UserPayload extends (0, swagger_1.PickType)(schema_1.User, [
    'nome',
    'cpf',
    'email',
    'status_assinante',
    'tipo_conta',
    'permissoes',
    'responsavel_mercados'
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String } };
    }
}
exports.UserPayload = UserPayload;
//# sourceMappingURL=user-payload.entity.js.map