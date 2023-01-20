"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSupermarketDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_supermarket_dto_1 = require("./create-supermarket.dto");
class UpdateSupermarketDto extends (0, swagger_1.PartialType)(create_supermarket_dto_1.CreateSupermarketDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSupermarketDto = UpdateSupermarketDto;
//# sourceMappingURL=update-supermarket.dto.js.map