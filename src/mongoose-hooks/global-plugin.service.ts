import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { UserPayload } from 'src/auth/entities';
import * as mongoose from 'mongoose';
import { LogDocument, Acao } from 'src/schema';

@Injectable()
export class GlobalPluginService {
  constructor(private readonly clsService: ClsService) { }

  setPlugin(logModel: mongoose.Model<LogDocument>) {
    const globalPluginService = this;
    return function (schema: mongoose.Schema) {
      schema.pre('save', function () {
        globalPluginService.logMiddleware(this, 'criar', logModel);
      });

      schema.pre(['updateOne', 'findOneAndUpdate'], function () {
        globalPluginService.logMiddleware(this, 'atualizar', logModel);
      });

      schema.pre('deleteOne', function () {
        globalPluginService.logMiddleware(this, 'remover', logModel);
      });

      schema.pre('deleteMany', function () {
        globalPluginService.logMiddleware(this, 'remover-muitos', logModel);
      });

      // schema.post<mongoose.Model<any>>('insertMany', function (docs, next) {
      //   globalPluginService.logMiddleware(docs, 'criar-muitos', logModel, this.collection.name);
      //   next()
      // });
    }
  }

  private logMiddleware(
    doc: mongoose.Document<any, any> | mongoose.Query<any, any> | any[],
    action: Acao,
    logModel: mongoose.Model<LogDocument>,
    collection = ''
  ) {
    const userPayload = this.clsService.get<UserPayload>('user');
    const ip = this.clsService.get<string>('ip');

    if (doc instanceof mongoose.Document) {
      logModel.collection.insertOne({
        acao: action,
        colecao: doc.collection.name,
        usuario: userPayload && userPayload.userId
          // @ts-ignore
          ? mongoose.Types.ObjectId(userPayload.userId)
          : null,
        // @ts-ignore
        documento: mongoose.Types.ObjectId(doc.id),
        data: new Date(),
        ip
      });
    } else if (doc instanceof mongoose.Query) {
      if (action === 'remover-muitos') {
        const ids = (doc as any)._conditions._id['$in']
        for (const id of ids) {
          logModel.collection.insertOne({
            acao: action,
            colecao: (doc as any)._collection.collection.name,
            usuario: userPayload && userPayload.userId
              // @ts-ignore
              ? mongoose.Types.ObjectId(userPayload.userId)
              : null,
            // @ts-ignore
            documento: mongoose.Types.ObjectId(id),
            data: new Date(),
            ip
          });
        }
      } else if (action === 'atualizar') {
        logModel.collection.insertOne({
          acao: action,
          colecao: (doc as any)._collection.collection.name,
          usuario: userPayload && userPayload.userId
            // @ts-ignore
            ? mongoose.Types.ObjectId(userPayload.userId)
            : null,
          // @ts-ignore
          documento: mongoose.Types.ObjectId((doc as any)._conditions._id),
          data: new Date(),
          ip
        });
      }
    } else {
      if (action === 'criar-muitos') {
        for (const d of doc) {
          logModel.collection.insertOne({
            acao: action,
            colecao: collection,
            usuario: userPayload && userPayload.userId
              // @ts-ignore
              ? mongoose.Types.ObjectId(userPayload.userId)
              : null,
            // @ts-ignore
            documento: d._id,
            data: new Date(),
            ip
          });
        }
      }
    }
  }
}