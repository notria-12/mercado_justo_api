import { ValidationArguments } from 'class-validator';

export function isPhoneNumber(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um telefone válido.`;
}
export function isNotEmpty(vArgs: ValidationArguments) {
    return `${vArgs.property} é obrigatório.`;
}
export function isEmail(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um email válido.`;
}
export function minLength(vArgs: ValidationArguments, value: number) {
    return `${vArgs.property} deve ter o tamanho mínimo de ${value} caracteres ou items.`;
}
export function maxLength(vArgs: ValidationArguments, value: number) {
    return `${vArgs.property} deve ter o tamanho máximo de ${value} caracteres ou items.`;
}
export function isIn(vArgs: ValidationArguments, values: string[]) {
    return `${vArgs.property} deve ser um dos seguintes valores: ${values.join(', ')}.`;
}
export function isMongoId(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um ObjectId válido.`;
}
export function eachMongoId(field: string) {
    return `Cada item do ${field} deve ser um id válido.`;
}
export function isDateString(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser uma data válida. Ex.: aaaa-mm-dd.`;
}
export function isCPF(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um CPF válido.`;
}
export function isCNPJ(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um CNPJ válido.`;
}
export function isCEP(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um CEP válido.`;
}
export function isNumber(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um número válido.`;
}
export function isNumberString(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um texto de número válido.`
}
export function IsMilitaryTime(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um horário válido. Ex.: HH:MM`;
}
export function isArray(vArgs: ValidationArguments, example = '') {
    return `${vArgs.property} deve ser uma matriz válida. ${example}`;
}
export function arrayMaxSize(vArgs: ValidationArguments, value: number) {
    return `${vArgs.property} deve ser menor ou igual a ${value}.`;
}
export function arrayMinSize(vArgs: ValidationArguments, value: number) {
    return `${vArgs.property} deve ser maior ou igual a ${value}.`
}
export function isDecimal(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um decimal válido.`
}
export function isString(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um texto válido.`
}
export function isInMessage(vArgs: ValidationArguments, values: Readonly<string[]>) {
    return `${vArgs.property} deve ser um dos seguintes valores: ${values.join(', ')}.`;
}
export function isObject(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um objeto.`
}
export function isBoolean(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser um boolean.`
}
export function arrayNotEmpty(vArgs: ValidationArguments) {
    return `${vArgs.property} não pode ser uma matriz vazia`;
}
export function min(vArgs: ValidationArguments, minValue: number) {
    return `${vArgs.property} deve ser maior que ${minValue}.`;
}
export function isUrl(vArgs: ValidationArguments) {
    return `${vArgs.property} deve ser uma URL válida.`;
}