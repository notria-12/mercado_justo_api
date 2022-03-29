import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { Model } from 'mongoose';
//import * as _ from 'lodash'

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

export abstract class ExcelImport {
  protected excelFile: xlsx.WorkBook;
  protected schemaModel: Model<any>;
  protected errors = {};
  protected successes = {};

  protected statesFullNameFromInitials = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantis'
  };

  protected codsIBGE = {
    'Aracaju': '2800308',
    'Balneário Camboriu': '4202008',
    'Belém': '1501402',
    'Belo Horizonte': '3106200',
    'Brasília': '5300108',
    'Boa Vista': '1400100',
    'Campinas': '3509502',
    'Campo Grande': '5300108',
    'Campo dos Goytacazes': '3301009',
    'Contagem': '3118601',
    'Cuiabá': '5103403',
    'Curitiba': '4106902',
    'Florianópolis': '4205407',
    'Fortaleza': '2304400',
    'Goiânia': '5208707',
    'Guarulhos': '3518800',
    'Itajaí': '4208203',
    'João Pessoa': '2507507',
    'Joinville': '4209102',
    'Macapá': '1600303',
    'Maceió': '2704302',
    'Manaus': '1302603',
    'Natal': '2408102',
    'Osasco': '3534401',
    'Pinhais': '4119152',
    'Porto Alegre': '4314902',
    'Porto Velho': '1100205'
  };

  /**
   * [{
      key: 'field_key',
      alias?: 'alias_key',
      dataTransform: (data) => ({}),
      required?: boolean | (worksheetName) => boolean
    },...]
   */
  protected abstract fields: FieldObject[];

  /**
   * [{
      key: 'field_key',
      dataTransform: (worksheetTitle) => ({})
    },...]
   */
  protected abstract assumption: FieldObject[];

  constructor(schemaModel: Model<any>) {
    this.schemaModel = schemaModel;
  }

  protected loadFile(uploadedFile: Express.Multer.File) {
    const pathFile = uploadedFile.path;
    this.excelFile = xlsx.readFile(pathFile, { cellDates: true });
    this.removeLoadedFile(pathFile);
  }

  protected unloadFile() {
    this.excelFile = null;
  }

  private removeLoadedFile(pathFile) {
    fs.unlink(pathFile, (err) => { });
  }

  protected getResult() {
    this.unloadFile();
    return {
      erros: this.errors,
      sucessos: this.successes,
    }
  }

  public async import(uploadedFile: Express.Multer.File) {
    this.loadFile(uploadedFile);

    for (const worksheet of this.excelFile.SheetNames) {
      this.setColumnNamesToFields(worksheet);
      const jsonRows = xlsx.utils.sheet_to_json(this.excelFile.Sheets[worksheet], {
        blankrows: false,
      });

      let sheetResult = [];
      for (const [i, row] of jsonRows.entries()) {
        let requiredDataArr = [];
        let requiredDataMissing = false;
        for (const field of this.fields) {
          const rowKeys = Object.keys(row);
          const key = rowKeys.includes(field.key)
            ? field.key
            : rowKeys.includes(field.alias)
              ? field.alias
              : null;
          if (key) {
            const value = field.dataTransform(this.clearData(row[key]));
            if (typeof value === null && this.isFieldRequired(field, { worksheet, jsonRow: row })) {
              requiredDataMissing = true
              const rowOffSetFromHeader = 2
              this.appendError(worksheet, i + rowOffSetFromHeader, field);
            } else {
              requiredDataArr.push({ [field.key]: typeof value !== null ? value : '' });
            }
          } else if (this.isFieldRequired(field, { worksheet, jsonRow: row })) {
            requiredDataMissing = true
            const rowOffSetFromHeader = 2
            this.appendError(worksheet, i + rowOffSetFromHeader, field);
          }
        }

        let assumptionDataArr = [];
        for (const field of this.assumption) {
          const value = field.dataTransform(worksheet);
          if (this.isFieldRequired(field, { worksheet, jsonRow: row }) && !value) {
            requiredDataMissing = true
            this.appendError(worksheet, 0, field, true);
          } else {
            assumptionDataArr.push({ [field.key]: value ? value : '' });
          }
        }

        if (requiredDataMissing) continue;

        this.appendSuccess(worksheet);
        const mongoData = [...requiredDataArr, ...assumptionDataArr]
          .reduce((obj, item) => Object.assign(obj, item, {}))
        sheetResult.push(mongoData);
      }
      await this.schemaModel.insertMany(sheetResult);
    }

    return Promise.resolve(this.getResult());
  }

  protected isFieldRequired(field: FieldObject, rfObject: RequiredFunctionObject) {
    if (typeof field.required == 'boolean') {
      return field.required
    } else if (typeof field.required == 'function') {
      return field.required(rfObject);
    } else {
      return false
    }
  }

  protected clearData(data: any) {
    if (typeof data == 'string') {
      return data
        .trim()
        .replace(/^"|"$/g, '')
        .replace(/"{2}/g, '"')
        .replace(/'{2}/g, '\'')
    } else {
      return data
    }
  }

  protected setColumnNamesToFields(worksheet: string) {
    const firstRow = /[a-z]1/i
    const otherRows = /^[a-z][^1]/i
    for (const key in this.excelFile.Sheets[worksheet]) {
      if (firstRow.test(key)) {
        // https://github.com/SheetJS/sheetjs#cell-object
        this.excelFile.Sheets[worksheet][key].w = undefined
        this.excelFile.Sheets[worksheet][key].v = this.columnNameToKey(this.excelFile.Sheets[worksheet][key].v);
      } else if (otherRows.test(key)) {
        break;
      }
    }
  }

  protected columnNameToKey(data: string) {
    const spaceOrPrepositions = /(\sd[a-zA-Z]\s|\s|\s?\/\s?)/gi
    let noAccents = data.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f%]/g, "").trim()
    return this.clearData(noAccents.replace(spaceOrPrepositions, '_'))
  }

  protected appendError(worksheet: string, line: number, fieldObj: FieldObject, isWorksheetError = false) {
    if (!this.errors[worksheet]) {
      this.errors[worksheet] = {}
    }

    const errMessage = `${fieldObj.key} é obrigatório e/ou é inválido.`;
    const lineString = isWorksheetError ? 'Erro geral' : `linha ${this.zeroPad(line)}`;
    if (Array.isArray(this.errors[worksheet][lineString])) {
      if (!this.errors[worksheet][lineString].includes(errMessage)) {
        this.errors[worksheet][lineString].push(errMessage);
      }
    } else {
      this.errors[worksheet][lineString] = [errMessage];
    }
  }

  protected appendSuccess(worksheet: string) {
    this.successes[worksheet] = this.successes[worksheet] ? ++this.successes[worksheet] : 1
  }

  private zeroPad = (num, places = 2) => String(num).padStart(places, '0');
}
