import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExcelImport, RequiredFunctionObject } from 'src/common'
import { User, UserDocument, orientacao, tipoConta, TipoConta, permissoes, uf } from 'src/schema';
import { Model } from 'mongoose';
import { CPF } from 'src/common/decorator/is-cpf.decorator'
import { isEmail, isPhoneNumber, isIn, min, isString, isNumber } from 'class-validator'
import * as bcrypt from 'bcrypt';
import * as xlsx from 'xlsx';

@Injectable()
export class UsersImport extends ExcelImport {
  private accountType: TipoConta;

  constructor(
    @InjectModel('usuarios')
    schemaModel: Model<UserDocument>,
  ) {
    super(schemaModel);
  }

  protected fields = [
    {
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
      alias: 'usuario_cpf',
      key: 'cpf',
      dataTransform: (data: any) => {
        if (isString(data)) {
          if (CPF(data.trim())) {
            return data.trim()
          }
          return null;
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      alias: 'e-mail',
      key: 'email',
      dataTransform: (data: any) => {
        if (isString(data)) {
          if (isEmail(data.trim())) {
            return data.trim()
          }
          return null;
        } else {
          return null
        }
      },
      required: true,
    },
    {
      alias: 'id',
      key: 'responsavel_mercados',
      dataTransform: (data: any) => {
        if (isNumber(data)) {
          return [data];
        } else if (isString(data)) {
          if (data.split(';').length > 0) {
            return data.split(';')
              .map(id => Number(id.trim()))
              .filter(id => id > 0);
          }
          return null;
        } else {
          return null;
        }
      },
    },
    {
      key: 'telefone',
      dataTransform: (data: any) => {
        if (isString(data)) {
          if (isPhoneNumber(data.trim(), 'BR')) {
            return data.trim();
          }
          return null;
        } else {
          return null;
        }
      },
      required: (rfObject: RequiredFunctionObject) => {
        return this.accountType == 'operador'
          ? true
          : false
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
      key: 'orientacao',
      dataTransform: (data: any) => isIn(this.toValueLowerCase(data), orientacao) ? this.toValueLowerCase(data) : null,
    },
    {
      key: 'idade',
      dataTransform: (data: any) => isNumber(data) && min(data, 18) ? data : null,
    },
    {
      key: 'senha',
      dataTransform: (data: any) => {
        if (data) {
          return bcrypt.hashSync(String(data).trim(), bcrypt.genSaltSync());
        } else {
          return null;
        }
      },
      required: true,
    },
    {
      key: 'permissoes',
      dataTransform: (data: any) => {
        if (isString(data)) {
          return data.split(';')
            .filter(permission => isIn(this.toPermissionValue(permission), permissoes))
            .map(permission => this.toPermissionValue(permission));
        } else {
          return null;
        }
      },
    },
  ];

  protected assumption = [
    {
      key: 'tipo_conta',
      dataTransform: (worksheetName: string) => {
        if (this.accountType && isIn(this.accountType, tipoConta)) {
          return this.accountType;
        } else {
          return null;
        }
      },
      required: true
    }
  ];

  public async import(uploadedFile: Express.Multer.File) {
    this.loadFile(uploadedFile);

    for (const worksheet of this.excelFile.SheetNames) {
      this.setColumnNamesToFields(worksheet);
      const jsonRows = xlsx.utils.sheet_to_json(this.excelFile.Sheets[worksheet], {
        blankrows: false,
      });
      const bulk = this.schemaModel.collection.initializeUnorderedBulkOp();
      let sheetResult: User[] = [];

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

      for (const row of sheetResult) {
        const exists = await this.schemaModel.findOne({
          $or: [
            { email: row.email },
            { cpf: row.cpf }
          ]
        });

        if (exists) {
          bulk
            .find({
              $or: [
                { email: row.email },
                { cpf: row.cpf }
              ]
            })
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

  public setAccountType(accountType: TipoConta) {
    this.accountType = accountType;
  }

  private toValueLowerCase(data: any) {
    return String(data).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  }

  private toValueUpperCase(data: any) {
    return String(data).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  }

  private toPermissionValue(data: string) {
    const spaceOrPrepositions = /(\sd[a-zA-Z]\s|\s|\s?\/\s?)/gi;
    let noAccents = this.toValueLowerCase(data);
    return this.clearData(noAccents.replace(spaceOrPrepositions, '_'));
  }
}