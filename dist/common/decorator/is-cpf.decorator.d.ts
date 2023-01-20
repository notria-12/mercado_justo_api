import { ValidationOptions } from 'class-validator';
export declare function IsCPF(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function CPF(cpf: string): boolean;
