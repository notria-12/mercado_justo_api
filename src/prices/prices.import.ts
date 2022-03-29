import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { UserPayload } from 'src/auth/entities';
import { InjectModel } from '@nestjs/mongoose';
import { ExcelImport, FieldObject } from 'src/common'
import { PriceDocument, ProductDocument } from 'src/schema';
import { Model, Types } from 'mongoose';
import { isNumber, isString } from 'class-validator'
import * as xlsx from 'xlsx';

interface ProductId {
  _id: Types.ObjectId;
  codigo_barras: string;
}

@Injectable()
export class PricesImport extends ExcelImport {
  private productsIds: ProductId[];
  private user: UserPayload;
  private updatedPrices: Types.ObjectId[] = [];
  private updatedSupermarketsIds: number[] = [];

  constructor(
    @InjectModel('precos')
    schemaModel: Model<PriceDocument>,
    @InjectModel('produtos')
    private productsModel: Model<ProductDocument>,
    private clsService: ClsService,
  ) {
    super(schemaModel);
  }

  protected fields: FieldObject[] = [
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
      key: 'preco',
      dataTransform: (data: any) => {
        if (isNumber(data)) {
          return this.toCash(data);
        } else {
          return '';
        }
      },
    },
    {
      key: 'id',
      dataTransform: (data: any) => {
        if (isNumber(data)) {
          return [data];
        } else if (isString(data)) {
          if (data.split(';').length > 0) {
            return data.split(';')
              .map(id => Number(id.trim()))
              .filter(id => id > 0);
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
      required: true,
    },
  ];

  protected assumption = [];

  protected toValue(data: any) {
    return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  protected toCash(data: number) {
    const value = String(data.toFixed(2)).replace('.', ',').trim();
    return `R$ ${value}`;
  }

  public async import(uploadedFile: Express.Multer.File) {
    this.user = this.clsService.get<UserPayload>('user');
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
        if (requiredDataMissing) continue;
        this.appendSuccess(worksheet);
        sheetResult.push(Object.assign({}, ...requiredDataArr));
      }

      await this.loadProductsIds(sheetResult
        .map(row => row.codigo_barras)
        .reduce((acc, curr) => acc.concat(...curr), [])
      );
      for (const row of sheetResult) {
        for (const id of row.id as number[]) {
          if (!this.userHasAccessToId(id)) {
            continue
          }
          this.updatedSupermarketsIds.push(id);

          for (const barcode of row.codigo_barras) {
            const productId = this.getProductIdFromBarcode(barcode)
            if (productId) {
              bulk
                .find({
                  id: id,
                  produto: productId,
                })
                .upsert()
                .updateOne({
                  $set: {
                    preco: row.preco,
                    atualizado_em: new Date()
                  }
                })
              this.updatedPrices.push(productId);
            }
          }
        }
      }
      if (bulk.batches.length > 0) {
        await bulk.execute();
      }
      if(this.updatedSupermarketsIds.length > 0) {
        await this.schemaModel.updateMany(
          {
            id: {
              $in: this.updatedSupermarketsIds,
            },
            produto: {
              $nin: this.updatedPrices,
            }
          },
          {
            preco: ''
          }
        );
        this.updatedSupermarketsIds = [];
        this.updatedPrices = []
      }
    }

    this.user = null;
    return Promise.resolve(this.getResult());
  }

  private getProductIdFromBarcode(barcode: string) {
    for (const productId of this.productsIds) {
      for (const prodBarCode of productId.codigo_barras) {
        if (prodBarCode === barcode) {
          return productId._id;
        }
      }
    }
    return null;
  }

  private async loadProductsIds(barcodes: string[]) {
    this.productsIds = await this.productsModel.aggregate([
      {
        $match: {
          codigo_barras: {
            $in: barcodes
          }
        }
      },
      {
        $project: {
          codigo_barras: 1
        }
      }
    ]);
  }

  private userHasAccessToId(supermarketId: number) {
    if (this.user.tipo_conta === 'admin') {
      return true;
    } else if (this.user.tipo_conta === 'operador' && this.user.responsavel_mercados.length === 0) {
      return true;
    } else {
      return this.user.responsavel_mercados.includes(supermarketId);
    }
  }
}