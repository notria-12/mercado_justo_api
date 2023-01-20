/// <reference types="multer" />
import { ClsService } from 'nestjs-cls';
import { ExcelImport, FieldObject } from 'src/common';
import { PriceDocument, ProductDocument } from 'src/schema';
import { Model } from 'mongoose';
export declare class PricesImport extends ExcelImport {
    private productsModel;
    private clsService;
    private productsIds;
    private user;
    private updatedPrices;
    private updatedSupermarketsIds;
    constructor(schemaModel: Model<PriceDocument>, productsModel: Model<ProductDocument>, clsService: ClsService);
    protected fields: FieldObject[];
    protected assumption: any[];
    protected toValue(data: any): string;
    protected toCash(data: number): string;
    import(uploadedFile: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    private getProductIdFromBarcode;
    private loadProductsIds;
    private userHasAccessToId;
}
