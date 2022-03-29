import {
  IsString as _IsString,
  IsNotEmpty as _IsNotEmpty,
  IsEmail as _IsEmail,
  IsNumber as _IsNumber,
  MaxLength as _MaxLength,
  MinLength as _MinLength,
  Min as _Min,
  IsArray as _IsArray,
  IsMongoId as _IsMongoId,
  IsIn as _IsIn,
  IsISO8601 as _IsDateString,
  IsNumberString as _IsNumberString,
  IsPhoneNumber as _IsPhoneNumber,
  IsObject as _IsObject,
  IsBoolean as _IsBoolean,
  ArrayNotEmpty as _ArrayNotEmpty,
  IsUrl as _IsUrl,
  IsNumberOptions,
  ValidationOptions
} from 'class-validator';
import { IsCNPJ as _IsCNPJ } from './is-cnpj.decorator';
import { IsCPF as _IsCPF } from './is-cpf.decorator';
import { IsCEP as _IsCEP } from './is-cep.decorator';
import { CountryCode } from 'libphonenumber-js';
import ValidatorJS from 'validator';
import * as ValidationMessages from './validation-messages';

export const IsNotEmpty = (options?: ValidationOptions) => _IsNotEmpty({ ...options, message: vArgs => ValidationMessages.isNotEmpty(vArgs) })
export const IsEmail = (emailOptions?: ValidatorJS.IsEmailOptions, options?: ValidationOptions) => _IsEmail({ ...emailOptions }, { message: vArgs => ValidationMessages.isEmail(vArgs) })
export const IsNumber = (numberOptions?: IsNumberOptions, options?: ValidationOptions) => _IsNumber({ ...numberOptions }, { ...options, message: vArgs => ValidationMessages.isNumber(vArgs) })
export const MinLength = (min: number, options?: ValidationOptions) => _MinLength(min, { ...options, message: vArgs => ValidationMessages.minLength(vArgs, min) })
export const MaxLength = (max: number, options?: ValidationOptions) => _MaxLength(max, { ...options, message: vArgs => ValidationMessages.maxLength(vArgs, max) })
export const IsArray = (example = '', options?: ValidationOptions) => _IsArray({ ...options, message: vArgs => ValidationMessages.isArray(vArgs, example) })
export const IsMongoId = (options?: ValidationOptions) => _IsMongoId({ ...options, message: vArgs => ValidationMessages.isMongoId(vArgs) })
export const IsNumberString = (numericOptions?: ValidatorJS.IsNumericOptions, options?: ValidationOptions) => _IsNumberString({ ...numericOptions }, { ...options, message: vArgs => ValidationMessages.isNumberString(vArgs) })
export const IsString = (options?: ValidationOptions) => _IsString({ ...options, message: vArgs => ValidationMessages.isString(vArgs) })
export const IsIn = (values: Readonly<string[]>, options?: ValidationOptions) => _IsIn(values, { ...options, message: vArgs => ValidationMessages.isInMessage(vArgs, values) })
export const IsPhoneNumber = (region?: CountryCode, options?: ValidationOptions) => _IsPhoneNumber(region, { ...options, message: vArgs => ValidationMessages.isPhoneNumber(vArgs) })
export const IsCNPJ = (options?: ValidationOptions) => _IsCNPJ({ ...options, message: vArgs => ValidationMessages.isCNPJ(vArgs) })
export const IsCPF = (options?: ValidationOptions) => _IsCPF({ ...options, message: vArgs => ValidationMessages.isCPF(vArgs) })
export const IsCEP = (options?: ValidationOptions) => _IsCEP({ ...options, message: vArgs => ValidationMessages.isCEP(vArgs) })
export const IsDateString = (dateOptions?: ValidatorJS.IsISO8601Options, options?: ValidationOptions) => _IsDateString({ ...dateOptions }, { ...options, message: vArgs => ValidationMessages.isDateString(vArgs) })
export const IsObject = (options?: ValidationOptions) => _IsObject({ ...options, message: vArgs => ValidationMessages.isObject(vArgs) })
export const IsBoolean = (options?: ValidationOptions) => _IsBoolean({ ...options, message: vArgs => ValidationMessages.isBoolean(vArgs) })
export const ArrayNotEmpty = (options?: ValidationOptions) => _ArrayNotEmpty({ ...options, message: vArgs => ValidationMessages.arrayNotEmpty(vArgs) })
export const Min = (minValue: number, options?: ValidationOptions) => _Min(minValue, { ...options, message: vArgs => ValidationMessages.min(vArgs, minValue) })
export const IsUrl = (urlOptions?: ValidatorJS.IsURLOptions, options?: ValidationOptions) => _IsUrl({ ...urlOptions }, { ...options, message: vArgs => ValidationMessages.isUrl(vArgs) })