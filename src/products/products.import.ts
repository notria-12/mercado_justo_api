import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExcelImport, FieldObject } from 'src/common';
import { ProductDocument, uf, unidade } from 'src/schema';
import { Model } from 'mongoose';
import { isNumber, isString } from 'class-validator';
import * as xlsx from 'xlsx';

@Injectable()
export class ProductsImport extends ExcelImport {
  constructor(
    @InjectModel('produtos')
    schemaModel: Model<ProductDocument>
  ) {
    super(schemaModel);
  }

  protected fields: FieldObject[] = [
    {
      key: 'descricao',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data;
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'codigo_barras',
      dataTransform: (data: any) => {
        if (isNumber(data)) {
          return [String(data)];
        } else if (isString(data)) {
          if (data.split(';').length > 0) {
            return data.split(';').map(barcode => barcode.trim());
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'categoria_1',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data;
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'categoria_2',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data;
        } else {
          return null;
        }
      },
    },
    {
      key: 'categoria_3',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data;
        } else {
          return null;
        }
      },
    },
    {
      key: 'unidade',
      dataTransform: (data: any) => {
        if (isString(data) && (unidade as any).includes(this.toValueLowerCase(data))) {
          return this.toValueLowerCase(data);
        } else {
          return null;
        }
      },
    },
    {
      key: 'cidade',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data;
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
    }
  ];

  protected assumption = [];

  private toValueUpperCase(data: any) {
    return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  }

  private toValueLowerCase(data: any) {
    return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  }

  public async import(uploadedFile: Express.Multer.File) {
    this.loadFile(uploadedFile);

    for (const worksheet of this.excelFile.SheetNames) {
      this.setColumnNamesToFields(worksheet);
      const jsonRows = xlsx.utils.sheet_to_json(this.excelFile.Sheets[worksheet], {
        blankrows: false,
      });
      const bulk = this.schemaModel.collection.initializeUnorderedBulkOp();
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
        sheetResult.push(Object.assign({}, ...requiredDataArr));
      }

      for (const row of sheetResult) {
        const exists = await this.schemaModel.exists({
          codigo_barras: {
            $in: row.codigo_barras,
          },
          cidade: row.cidade
        });

        if (exists) {
          bulk
            .find({
              codigo_barras: {
                $in: row.codigo_barras,
              },
              cidade: row.cidade
            })
            .updateOne({ $set: row })
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
}