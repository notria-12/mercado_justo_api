"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = exports.min = exports.arrayNotEmpty = exports.isBoolean = exports.isObject = exports.isInMessage = exports.isString = exports.isDecimal = exports.arrayMinSize = exports.arrayMaxSize = exports.isArray = exports.IsMilitaryTime = exports.isNumberString = exports.isNumber = exports.isCEP = exports.isCNPJ = exports.isCPF = exports.isDateString = exports.eachMongoId = exports.isMongoId = exports.isIn = exports.maxLength = exports.minLength = exports.isEmail = exports.isNotEmpty = exports.isPhoneNumber = void 0;
function isPhoneNumber(vArgs) {
    return `${vArgs.property} deve ser um telefone válido.`;
}
exports.isPhoneNumber = isPhoneNumber;
function isNotEmpty(vArgs) {
    return `${vArgs.property} é obrigatório.`;
}
exports.isNotEmpty = isNotEmpty;
function isEmail(vArgs) {
    return `${vArgs.property} deve ser um email válido.`;
}
exports.isEmail = isEmail;
function minLength(vArgs, value) {
    return `${vArgs.property} deve ter o tamanho mínimo de ${value} caracteres ou items.`;
}
exports.minLength = minLength;
function maxLength(vArgs, value) {
    return `${vArgs.property} deve ter o tamanho máximo de ${value} caracteres ou items.`;
}
exports.maxLength = maxLength;
function isIn(vArgs, values) {
    return `${vArgs.property} deve ser um dos seguintes valores: ${values.join(', ')}.`;
}
exports.isIn = isIn;
function isMongoId(vArgs) {
    return `${vArgs.property} deve ser um ObjectId válido.`;
}
exports.isMongoId = isMongoId;
function eachMongoId(field) {
    return `Cada item do ${field} deve ser um id válido.`;
}
exports.eachMongoId = eachMongoId;
function isDateString(vArgs) {
    return `${vArgs.property} deve ser uma data válida. Ex.: aaaa-mm-dd.`;
}
exports.isDateString = isDateString;
function isCPF(vArgs) {
    return `${vArgs.property} deve ser um CPF válido.`;
}
exports.isCPF = isCPF;
function isCNPJ(vArgs) {
    return `${vArgs.property} deve ser um CNPJ válido.`;
}
exports.isCNPJ = isCNPJ;
function isCEP(vArgs) {
    return `${vArgs.property} deve ser um CEP válido.`;
}
exports.isCEP = isCEP;
function isNumber(vArgs) {
    return `${vArgs.property} deve ser um número válido.`;
}
exports.isNumber = isNumber;
function isNumberString(vArgs) {
    return `${vArgs.property} deve ser um texto de número válido.`;
}
exports.isNumberString = isNumberString;
function IsMilitaryTime(vArgs) {
    return `${vArgs.property} deve ser um horário válido. Ex.: HH:MM`;
}
exports.IsMilitaryTime = IsMilitaryTime;
function isArray(vArgs, example = '') {
    return `${vArgs.property} deve ser uma matriz válida. ${example}`;
}
exports.isArray = isArray;
function arrayMaxSize(vArgs, value) {
    return `${vArgs.property} deve ser menor ou igual a ${value}.`;
}
exports.arrayMaxSize = arrayMaxSize;
function arrayMinSize(vArgs, value) {
    return `${vArgs.property} deve ser maior ou igual a ${value}.`;
}
exports.arrayMinSize = arrayMinSize;
function isDecimal(vArgs) {
    return `${vArgs.property} deve ser um decimal válido.`;
}
exports.isDecimal = isDecimal;
function isString(vArgs) {
    return `${vArgs.property} deve ser um texto válido.`;
}
exports.isString = isString;
function isInMessage(vArgs, values) {
    return `${vArgs.property} deve ser um dos seguintes valores: ${values.join(', ')}.`;
}
exports.isInMessage = isInMessage;
function isObject(vArgs) {
    return `${vArgs.property} deve ser um objeto.`;
}
exports.isObject = isObject;
function isBoolean(vArgs) {
    return `${vArgs.property} deve ser um boolean.`;
}
exports.isBoolean = isBoolean;
function arrayNotEmpty(vArgs) {
    return `${vArgs.property} não pode ser uma matriz vazia`;
}
exports.arrayNotEmpty = arrayNotEmpty;
function min(vArgs, minValue) {
    return `${vArgs.property} deve ser maior que ${minValue}.`;
}
exports.min = min;
function isUrl(vArgs) {
    return `${vArgs.property} deve ser uma URL válida.`;
}
exports.isUrl = isUrl;
//# sourceMappingURL=validation-messages.js.map