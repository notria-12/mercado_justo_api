import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupermarketDto, UpdateSupermarketDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupermarketDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch, generateSearchObject, BulkRemoveDto } from 'src/common';
import { SupermarketsImport } from './supermarkets.import';
import { UserPayload } from 'src/auth/entities';
import { ClsService } from 'nestjs-cls';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupermarketsService {
  constructor(
    @InjectModel('mercados')
    private schemaModel: Model<SupermarketDocument>,
    private clsService: ClsService,
    private eventEmitter: EventEmitter2,
    private supermarketsImport: SupermarketsImport
  ) { }

  async create(createSupermarketDto: CreateSupermarketDto) {
    if (typeof createSupermarketDto.ordem === 'number') {
      if (!(await this.isSupermarketPosAvailable(createSupermarketDto))) {
        throw new BadRequestException({
          mensagem: 'Já existe um mercado nesta ordem.',
          dados: {}
        });
      }
    }

    const exists = await this.schemaModel.exists({ cnpj: createSupermarketDto.cnpj });
    if (exists && !!createSupermarketDto.cnpj) {
      throw new BadRequestException({
        mensagem: 'Já existe um mercado com este CNPJ.',
        dados: {}
      });
    } else {
      const newSupermarket = new this.schemaModel(createSupermarketDto);
      return await (await newSupermarket.save()).populate({
        path: 'responsavel',
        select: '-senha'
      });
    }
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query, '', {
      path: 'responsavel',
      select: '-senha'
    });
  }

  async findOne(id: string) {
    this.eventEmitter.emit(
      'access.mercados',
      {
        documento: id,
        usuario: this.clsService.get<UserPayload>('user').userId || null,
        colecao: 'mercados'
      }
    );
    return await this.schemaModel.findById(id).populate({
      path: 'responsavel',
      select: '-senha'
    });
  }

  async getList(query: PaginationDto & FindAllSearchDto) {
    const preFilter = this.getPrefilter();
    const searchObj = generateSearchObject(query) as any;
    if (Object.keys(searchObj).length === 0) {
      return await this.schemaModel.aggregate([
        { $match: preFilter },
        {
          $group: {
            _id: {
              nome: '$nome',
            },
          }
        },
        {
          $sort: {
            '_id.nome': 1,
          }
        },
        {
          $project: {
            _id: 0,
            value: '$_id.nome',
            text: '$_id.nome'
          }
        }
      ]);
    } else {
      return await this.schemaModel.aggregate([
        { $match: searchObj },
        {
          $group: {
            _id: {
              id: '$id',
            },
          }
        },
        {
          $sort: {
            '_id.id': 1,
          }
        },
        {
          $project: {
            _id: 0,
            value: '$_id.id',
            text: '$_id.id'
          }
        }
      ]);
    }
  }

  async update(id: string, updateSupermarketDto: UpdateSupermarketDto) {
    if (typeof updateSupermarketDto.ordem === 'number') {
      if (!(await this.isSupermarketPosAvailable(updateSupermarketDto, id))) {
        throw new BadRequestException({
          mensagem: 'Já existe um mercado nesta ordem.',
          dados: {}
        });
      }
    }

    const exists = await this.schemaModel.exists({ cnpj: updateSupermarketDto.cnpj });
    if (exists && updateSupermarketDto.cnpj) {
      throw new BadRequestException({
        mensagem: 'Já existe um mercado com este CNPJ.',
        dados: {}
      });
    }

    return await this.schemaModel.findOneAndUpdate(
      { _id: id },
      updateSupermarketDto,
      { new: true }
    ).populate({
      path: 'responsavel',
      select: '-senha'
    });
  }

  async remove(id: string) {
    await this.schemaModel.deleteOne({ _id: id });
    return {};
  }

  async bulkRemove(bulkRemoveDto: BulkRemoveDto) {
    await this.schemaModel.deleteMany({
      _id: {
        $in: bulkRemoveDto.ids
      }
    });
    return {};
  }

  async import(file: Express.Multer.File) {
    return await this.supermarketsImport.import(file);
  }

  private getPrefilter() {
    let preFilter = Object();
    const user = this.clsService.get<UserPayload>('user');
    if (user && user.tipo_conta === 'gerente') {
      preFilter.id = {
        $in: user.responsavel_mercados
      };
    } else if (user && user.tipo_conta === 'operador') {
      if (user.responsavel_mercados.length > 0) {
        preFilter.id = {
          $in: user.responsavel_mercados
        };
      }
    }
    return preFilter;
  }

  private async isSupermarketPosAvailable(supermarket: CreateSupermarketDto | UpdateSupermarketDto, id: string = null) {
    if (id) {
      return !(await this.schemaModel.exists({
        _id: { $ne: id },
        cidade: supermarket.cidade,
        ordem: supermarket.ordem
      }));
    } else {
      return !(await this.schemaModel.exists({
        cidade: supermarket.cidade,
        ordem: supermarket.ordem
      }));
    }
  }
}
