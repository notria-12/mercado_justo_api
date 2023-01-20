import { ValidationArguments } from 'class-validator';
export declare function isPhoneNumber(vArgs: ValidationArguments): string;
export declare function isNotEmpty(vArgs: ValidationArguments): string;
export declare function isEmail(vArgs: ValidationArguments): string;
export declare function minLength(vArgs: ValidationArguments, value: number): string;
export declare function maxLength(vArgs: ValidationArguments, value: number): string;
export declare function isIn(vArgs: ValidationArguments, values: string[]): string;
export declare function isMongoId(vArgs: ValidationArguments): string;
export declare function eachMongoId(field: string): string;
export declare function isDateString(vArgs: ValidationArguments): string;
export declare function isCPF(vArgs: ValidationArguments): string;
export declare function isCNPJ(vArgs: ValidationArguments): string;
export declare function isCEP(vArgs: ValidationArguments): string;
export declare function isNumber(vArgs: ValidationArguments): string;
export declare function isNumberString(vArgs: ValidationArguments): string;
export declare function IsMilitaryTime(vArgs: ValidationArguments): string;
export declare function isArray(vArgs: ValidationArguments, example?: string): string;
export declare function arrayMaxSize(vArgs: ValidationArguments, value: number): string;
export declare function arrayMinSize(vArgs: ValidationArguments, value: number): string;
export declare function isDecimal(vArgs: ValidationArguments): string;
export declare function isString(vArgs: ValidationArguments): string;
export declare function isInMessage(vArgs: ValidationArguments, values: Readonly<string[]>): string;
export declare function isObject(vArgs: ValidationArguments): string;
export declare function isBoolean(vArgs: ValidationArguments): string;
export declare function arrayNotEmpty(vArgs: ValidationArguments): string;
export declare function min(vArgs: ValidationArguments, minValue: number): string;
export declare function isUrl(vArgs: ValidationArguments): string;