import { IsNumberOptions, ValidationOptions } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';
export declare const IsNotEmpty: (options?: ValidationOptions) => PropertyDecorator;
export declare const IsEmail: (emailOptions?: ValidatorJS.IsEmailOptions, options?: ValidationOptions) => PropertyDecorator;
export declare const IsNumber: (numberOptions?: IsNumberOptions, options?: ValidationOptions) => PropertyDecorator;
export declare const MinLength: (min: number, options?: ValidationOptions) => PropertyDecorator;
export declare const MaxLength: (max: number, options?: ValidationOptions) => PropertyDecorator;
export declare const IsArray: (example?: string, options?: ValidationOptions) => PropertyDecorator;
export declare const IsMongoId: (options?: ValidationOptions) => PropertyDecorator;
export declare const IsNumberString: (numericOptions?: ValidatorJS.IsNumericOptions, options?: ValidationOptions) => PropertyDecorator;
export declare const IsString: (options?: ValidationOptions) => PropertyDecorator;
export declare const IsIn: (values: Readonly<string[]>, options?: ValidationOptions) => PropertyDecorator;
export declare const IsPhoneNumber: (region?: CountryCode, options?: ValidationOptions) => PropertyDecorator;
export declare const IsCNPJ: (options?: ValidationOptions) => (object: Object, propertyName: string) => void;
export declare const IsCPF: (options?: ValidationOptions) => (object: Object, propertyName: string) => void;
export declare const IsCEP: (options?: ValidationOptions) => (object: Object, propertyName: string) => void;
export declare const IsDateString: (dateOptions?: ValidatorJS.IsISO8601Options, options?: ValidationOptions) => PropertyDecorator;
export declare const IsObject: (options?: ValidationOptions) => PropertyDecorator;
export declare const IsBoolean: (options?: ValidationOptions) => PropertyDecorator;
export declare const ArrayNotEmpty: (options?: ValidationOptions) => PropertyDecorator;
export declare const Min: (minValue: number, options?: ValidationOptions) => PropertyDecorator;
export declare const IsUrl: (urlOptions?: ValidatorJS.IsURLOptions, options?: ValidationOptions) => PropertyDecorator;
