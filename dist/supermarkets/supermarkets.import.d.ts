/// <reference types="multer" />
import { ExcelImport } from 'src/common';
import { SupermarketDocument } from 'src/schema';
import { Model } from 'mongoose';
export declare class SupermarketsImport extends ExcelImport {
    constructor(schemaModel: Model<SupermarketDocument>);
    protected fields: ({
        alias: string;
        key: string;
        dataTransform: (data: any) => string;
        required: boolean;
    } | {
        key: string;
        dataTransform: (data: any) => any;
        required: boolean;
        alias?: undefined;
    } | {
        key: string;
        dataTransform: (data: any) => any;
        alias?: undefined;
        required?: undefined;
    })[];
    protected assumption: any[];
    import(uploadedFile: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private toValueUpperCase;
}
