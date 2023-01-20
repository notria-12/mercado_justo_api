import { ValidationOptions } from 'class-validator';
export declare function IsCNPJ(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function CNPJ(cnpj: string): boolean;
