/// <reference types="multer" />
import { ExcelImport, FieldObject } from 'src/common';
import { ProductDocument } from 'src/schema';
import { Model } from 'mongoose';
export declare class ProductsImport extends ExcelImport {
    constructor(schemaModel: Model<ProductDocument>);
    protected fields: FieldObject[];
    protected assumption: any[];
    private toValueUpperCase;
    private toValueLowerCase;
    import(uploadedFile: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
}
