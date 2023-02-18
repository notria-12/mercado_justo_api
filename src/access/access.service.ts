import { Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessDocument } from 'src/schema';
import { OnEvent } from '@nestjs/event-emitter';
import { AccessResponse } from './entities';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch } from 'src/common';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('acessos')
    private schemaModel: Model<AccessDocument>
  ) { }

  @OnEvent('access.*')
  async handleAccessEvents(payload: CreateAccessDto) {
    const newAccess = new this.schemaModel(payload);
    await newAccess.save();
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query, '');
  }

  async findOne(id: string) {
    return await this.schemaModel.findById(id);
  }

  async getAccesses(): Promise<AccessResponse> {
    return (await this.schemaModel.aggregate<AccessResponse>([
      {
        $facet: {
          usuarios: [
            { $match: { colecao: 'usuarios' } },
            {
              $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
              }
            },
            {
              $group: {
                _id: {
                  mes: { $month: '$data_hora' },
                  ano: { $year: '$data_hora' },
                },
                acessos: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                mes: '$_id.mes',
                ano: '$_id.ano',
                acessos: 1,
              }
            },
            { $sort: { ano: 1, mes: 1 } }
          ],
          produtos: [
            { $match: { colecao: 'produtos' } },
            {
              $lookup: {
                from: 'produtos',
                localField: 'documento',
                foreignField: '_id',
                as: 'documento'
              }
            },
            {
              $group: {
                _id: {
                  produto: '$documento',
                  mes: { $month: '$data_hora' },
                  ano: { $year: '$data_hora' },
                },
                acessos: { $sum: 1 }
              }
            },
            { $sort: { '_id.ano': 1, '_id.mes': 1 } },
            {
              $group: {
                _id: { produto: '$_id.produto' },
                acessos: {
                  $push: {
                    mes: '$_id.mes',
                    ano: '$_id.ano',
                    total: { $sum: '$acessos' }
                  }
                }
              },
            },
            {
              $project: {
                _id: 0,
                acessos: 1,
                produto: { $arrayElemAt: ['$_id.produto', 0] },
              }
            },
          ],
          mercados: [
            { $match: { colecao: 'mercados' } },
            {
              $lookup: {
                from: 'mercados',
                localField: 'documento',
                foreignField: '_id',
                as: 'documento'
              }
            },
            {
              $group: {
                _id: {
                  mercado: '$documento',
                  mes: { $month: '$data_hora' },
                  ano: { $year: '$data_hora' },
                },
                acessos: { $sum: 1 }
              }
            },
            { $sort: { '_id.ano': 1, '_id.mes': 1 } },
            {
              $group: {
                _id: { mercado: '$_id.mercado' },
                acessos: {
                  $push: {
                    mes: '$_id.mes',
                    ano: '$_id.ano',
                    total: { $sum: '$acessos' }
                  }
                }
              },
            },
            {
              $project: {
                _id: 0,
                acessos: 1,
                mercado: { $arrayElemAt: ['$_id.mercado', 0] },
              }
            },
          ]
        }
      },
    ]))[0];
  }
}
