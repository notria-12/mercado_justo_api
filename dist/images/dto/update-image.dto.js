"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImageDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_image_dto_1 = require("./create-image.dto");
class UpdateImageDto extends (0, swagger_1.PartialType)(create_image_dto_1.CreateImageDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateImageDto = UpdateImageDto;
//# sourceMappingURL=update-image.dto.js.map