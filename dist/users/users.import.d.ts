/// <reference types="multer" />
import { ExcelImport, RequiredFunctionObject } from 'src/common';
import { UserDocument, TipoConta } from 'src/schema';
import { Model } from 'mongoose';
export declare class UsersImport extends ExcelImport {
    private accountType;
    constructor(schemaModel: Model<UserDocument>);
    protected fields: ({
        key: string;
        dataTransform: (data: any) => string;
        required: boolean;
        alias?: undefined;
    } | {
        alias: string;
        key: string;
        dataTransform: (data: any) => string;
        required: boolean;
    } | {
        alias: string;
        key: string;
        dataTransform: (data: any) => any[];
        required?: undefined;
    } | {
        key: string;
        dataTransform: (data: any) => string;
        required: (rfObject: RequiredFunctionObject) => boolean;
        alias?: undefined;
    } | {
        key: string;
        dataTransform: (data: any) => any;
        required?: undefined;
        alias?: undefined;
    })[];
    protected assumption: {
        key: string;
        dataTransform: (worksheetName: string) => "admin" | "operador" | "gerente" | "cliente";
        required: boolean;
    }[];
    import(uploadedFile: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    setAccountType(accountType: TipoConta): void;
    private toValueLowerCase;
    private toValueUpperCase;
    private toPermissionValue;
}
