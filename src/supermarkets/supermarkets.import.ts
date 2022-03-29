import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExcelImport, CNPJ } from 'src/common';
import { Supermarket, SupermarketDocument, uf } from 'src/schema';
import { Model } from 'mongoose';
import { isString, isNumber, min, isURL, isPhoneNumber, isNumberString } from 'class-validator';
import * as xlsx from 'xlsx';

@Injectable()
export class SupermarketsImport extends ExcelImport {
  constructor(
    @InjectModel('mercados')
    schemaModel: Model<SupermarketDocument>
  ) {
    super(schemaModel);
  }

  protected fields = [
    {
      alias: 'mercado',
      key: 'nome',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data.trim();
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'id',
      dataTransform: (data: any) => {
        if (isNumber(data) && min(data, 1)) {
          return data;
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'latitude',
      dataTransform: (data: any) => {
        if (isNumberString(data)) {
          return Number(data);
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'longitude',
      dataTransform: (data: any) => {
        if (isNumberString(data)) {
          return Number(data);
        } else {
          return null;
        }
      },
      required: true,
    },

    {
      key: 'site',
      dataTransform: (data: any) => {
        if (isURL(data)) {
          return data.trim();
        } else {
          return null;
        }
      },
    },
    {
      key: 'cnpj',
      dataTransform: (data: any) => {
        if (isString(data) && CNPJ(data)) {
          return data.trim();
        } else {
          return null;
        }
      },
    },
    {
      key: 'telefone',
      dataTransform: (data: any) => {
        if (isPhoneNumber(data, 'BR')) {
          return data.trim();
        } else {
          return null;
        }
      },
    },
    {
      key: 'endereco',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data.trim();
        } else {
          return null;
        }
      },
    },
    {
      key: 'cidade',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data.trim();
        } else {
          return null;
        }
      },
    },
    {
      key: 'uf',
      dataTransform: (data: any) => {
        if (isString(data) && (uf as any).includes(this.toValueUpperCase(data))) {
          return this.toValueUpperCase(data);
        } else {
          return null;
        }
      },
    },
    {
      key: 'ordem',
      dataTransform: (data: any) => {
        if (isNumber(data)) {
          return data;
        } else {
          return null;
        }
      },
    },
  ];

  protected assumption = [];

  public async import(uploadedFile: Express.Multer.File) {
    this.loadFile(uploadedFile);

    for (const worksheet of this.excelFile.SheetNames) {
      this.setColumnNamesToFields(worksheet);
      const jsonRows = xlsx.utils.sheet_to_json(this.excelFile.Sheets[worksheet], {
        blankrows: false,
      });
      const bulk = this.schemaModel.collection.initializeUnorderedBulkOp();
      let sheetResult: Supermarket[] = [];

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
        sheetResult.push(Object.assign({}, ...requiredDataArr));
      }

      for (const row of sheetResult) {
        const exists = await this.schemaModel.exists({ cnpj: row.cnpj });
        if (exists && row.cnpj) {
          bulk
            .find({ cnpj: row.cnpj })
            .updateOne({ $set: row });
        } else {
          bulk.insert(row);
        }
      }
      if (bulk.batches.length > 0) {
        await bulk.execute();
      }
    }

    return Promise.resolve(this.getResult());
  }

  private toValueUpperCase(data: any) {
    return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  }
}