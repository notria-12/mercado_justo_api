"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCEP = void 0;
const class_validator_1 = require("class-validator");
const cep = require('cep-promise');
function IsCEP(validationOptions) {
    if (typeof validationOptions == 'undefined') {
        validationOptions = {
            message: 'CEP deve ser válido.',
        };
    }
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsCEP',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    return new Promise((resolve, reject) => {
                        cep(value)
                            .then(() => resolve(true))
                            .catch(() => resolve(false));
                    });
                },
            },
        });
    };
}
exports.IsCEP = IsCEP;
//# sourceMappingURL=is-cep.decorator.js.map