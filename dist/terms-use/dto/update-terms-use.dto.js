"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTermsUseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_terms_use_dto_1 = require("./create-terms-use.dto");
class UpdateTermsUseDto extends (0, swagger_1.PartialType)(create_terms_use_dto_1.CreateTermsUseDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTermsUseDto = UpdateTermsUseDto;
//# sourceMappingURL=update-terms-use.dto.js.map