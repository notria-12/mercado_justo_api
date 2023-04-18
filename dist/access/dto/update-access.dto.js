"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_access_dto_1 = require("./create-access.dto");
class UpdateAccessDto extends (0, swagger_1.PartialType)(create_access_dto_1.CreateAccessDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAccessDto = UpdateAccessDto;
//# sourceMappingURL=update-access.dto.js.map