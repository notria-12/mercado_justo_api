"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNPJ = exports.IsCNPJ = void 0;
const class_validator_1 = require("class-validator");
function IsCNPJ(validationOptions) {
    if (typeof validationOptions == 'undefined') {
        validationOptions = {
            message: 'CNPJ deve ser válido.',
        };
    }
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsCNPJ',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    return CNPJ(value);
                },
            },
        });
    };
}
exports.IsCNPJ = IsCNPJ;
function CNPJ(cnpj) {
    if (cnpj.length < 18) {
        return false;
    }
    const firstStepMultiplication = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondStepMultiplication = [6, ...firstStepMultiplication];
    const lastTwoDigits = cnpj.replace(/(\.|\/|-)/g, '').slice(-2);
    const stripedCNPJArr = cnpj.replace(/(\.|\/|-)/g, '').slice(0, -2).split('');
    let firstDigit = _calcCPNJDigit(firstStepMultiplication, stripedCNPJArr);
    let secondDigit = _calcCPNJDigit(secondStepMultiplication, [...stripedCNPJArr, firstDigit]);
    if (lastTwoDigits[0] == firstDigit.toString() && lastTwoDigits[1] == secondDigit.toString()) {
        return true;
    }
    else {
        return false;
    }
}
exports.CNPJ = CNPJ;
function _calcCPNJDigit(stepMultiplicationArr, stripedCNPJArr) {
    const magicNumber = 11;
    let result = 0;
    for (let i = 0; i < stepMultiplicationArr.length; i++) {
        result += stepMultiplicationArr[i] * stripedCNPJArr[i];
    }
    const moduleFirstStep = result % magicNumber;
    if (moduleFirstStep > 2) {
        return magicNumber - moduleFirstStep;
    }
    else {
        return 0;
    }
}
//# sourceMappingURL=is-cnpj.decorator.js.map