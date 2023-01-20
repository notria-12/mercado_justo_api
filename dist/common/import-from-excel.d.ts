/// <reference types="multer" />
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
export interface FieldObject {
    key: string;
    dataTransform: Function;
    required?: boolean | Function;
    alias?: string;
}
export interface RequiredFunctionObject {
    worksheet: string;
    jsonRow: any;
}
export declare abstract class ExcelImport {
    protected excelFile: xlsx.WorkBook;
    protected schemaModel: Model<any>;
    protected errors: {};
    protected successes: {};
    protected statesFullNameFromInitials: {
        AC: string;
        AL: string;
        AP: string;
        AM: string;
        BA: string;
        CE: string;
        DF: string;
        ES: string;
        GO: string;
        MA: string;
        MT: string;
        MS: string;
        MG: string;
        PA: string;
        PB: string;
        PR: string;
        PE: string;
        PI: string;
        RJ: string;
        RN: string;
        RS: string;
        RO: string;
        RR: string;
        SC: string;
        SP: string;
        SE: string;
        TO: string;
    };
    protected codsIBGE: {
        Aracaju: string;
        'Balne\u00E1rio Camboriu': string;
        Belém: string;
        'Belo Horizonte': string;
        Brasília: string;
        'Boa Vista': string;
        Campinas: string;
        'Campo Grande': string;
        'Campo dos Goytacazes': string;
        Contagem: string;
        Cuiabá: string;
        Curitiba: string;
        Florianópolis: string;
        Fortaleza: string;
        Goiânia: string;
        Guarulhos: string;
        Itajaí: string;
        'Jo\u00E3o Pessoa': string;
        Joinville: string;
        Macapá: string;
        Maceió: string;
        Manaus: string;
        Natal: string;
        Osasco: string;
        Pinhais: string;
        'Porto Alegre': string;
        'Porto Velho': string;
    };
    protected abstract fields: FieldObject[];
    protected abstract assumption: FieldObject[];
    constructor(schemaModel: Model<any>);
    protected loadFile(uploadedFile: Express.Multer.File): void;
    protected unloadFile(): void;
    private removeLoadedFile;
    protected getResult(): {
        erros: {};
        sucessos: {};
    };
    import(uploadedFile: Express.Multer.File): Promise<{
        erros: {};
        sucessos: {};
    }>;
    protected isFieldRequired(field: FieldObject, rfObject: RequiredFunctionObject): any;
    protected clearData(data: any): any;
    protected setColumnNamesToFields(worksheet: string): void;
    protected columnNameToKey(data: string): any;
    protected appendError(worksheet: string, line: number, fieldObj: FieldObject, isWorksheetError?: boolean): void;
    protected appendSuccess(worksheet: string): void;
    private zeroPad;
}
