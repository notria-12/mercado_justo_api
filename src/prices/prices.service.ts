import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePriceDto, UpdatePriceDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PriceDocument, ProductDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch, BulkRemoveDto, generateSearchObject, tryToParse, SearchObj } from 'src/common';
import { UserPayload } from 'src/auth/entities';
import { ClsService } from 'nestjs-cls';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PricesImport } from './prices.import';

@Injectable()
export class PricesService {
  constructor(
    @InjectModel('precos')
    private schemaModel: Model<PriceDocument>,
    @InjectModel('produtos')
    private productsModel: Model<ProductDocument>,
    private clsService: ClsService,
    private eventEmitter: EventEmitter2,
    private pricesImport: PricesImport
  ) { }

  async create(createPriceDto: CreatePriceDto) {
    const newPrice = new this.schemaModel(createPriceDto);
    if (this.userHasAccessToId(createPriceDto.id)) {
      const exists = await this.schemaModel.exists({
        id: createPriceDto.id,
        produto: createPriceDto.produto
      });
      if (exists) {
        return await this.schemaModel.findOneAndUpdate(
          {
            id: createPriceDto.id,
            produto: createPriceDto.produto
          },
          createPriceDto,
          { new: true }
        ).populate('produto');
      } else {
        return await (await newPrice.save()).populate('produto');
      }
    } else {
      throw new ForbiddenException({
        mensagem: 'Você não possui acesso a este ID.',
        dados: {}
      });
    }
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    const productSearchKeys = ['codigo_barras', 'descricao'];
    const priceSearchKeys = ['id', 'preco'];
    const searchObj = generateSearchObject(query) as any;

    if (Object.keys(searchObj).some(key => productSearchKeys.includes(key))) {
      const productSearch = Object.keys(searchObj)
        .filter(key => productSearchKeys.includes(key))
        .reduce((acc, cur) => Object.assign(acc, { [cur]: searchObj[cur] }), {});
      const products = await this.productsModel.find(productSearch);

      const priceQuery = tryToParse(query.procurar)
        .filter((searchObj: SearchObj) => priceSearchKeys.includes(searchObj.termo));
      return await findAllWithPaginationSearch(
        this.schemaModel,
        {
          ...query,
          procurar: priceQuery
        },
        '',
        'produto',
        {
          produto: {
            $in: products.map(prod => prod._id)
          }
        }
      );
    } else {
      return await findAllWithPaginationSearch(this.schemaModel, query, '', 'produto');
    }
  }

  async findOne(id: string) {
    this.eventEmitter.emit(
      'access.precos',
      {
        documento: id,
        usuario: this.clsService.get<UserPayload>('user').userId || null,
        colecao: 'precos'
      }
    );
    return await this.schemaModel.findById(id)
      .populate('produto');
  }

  async findSpecificPrices(productId: string, marketsId: number) {
    // this.eventEmitter.emit(
    //   'access.precos',
    //   {
    //     documento: id,
    //     usuario: this.clsService.get<UserPayload>('user').userId || null,
    //     colecao: 'precos'
    //   }
    // );
    return await this.schemaModel.find({
      where:{
        $and:[{ produto: productId}, {id:{ marketsId}}]
      }
    });
      
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    if (this.userHasAccessToId(updatePriceDto.id)) {
      return await this.schemaModel.findOneAndUpdate(
        { _id: id },
        updatePriceDto,
        { new: true }
      ).populate('produto');
    } else {
      throw new ForbiddenException({
        mensagem: 'Você não possui acesso a este ID.',
        dados: {}
      });
    }
  }

  async remove(id: string) {
    const preFilter = this.getPrefilter();
    await this.schemaModel.deleteOne({ _id: id, ...preFilter });
    return {};
  }

  async bulkRemove(bulkRemoveDto: BulkRemoveDto) {
    const preFilter = this.getPrefilter();
    await this.schemaModel.deleteMany({
      _id: {
        $in: bulkRemoveDto.ids
      },
      ...preFilter
    });
    return {};
  }

  async import(file: Express.Multer.File) {
    return await this.pricesImport.import(file);
  }

  private getPrefilter() {
    let preFilter = Object();
    const user = this.clsService.get<UserPayload>('user');
    if (user.tipo_conta === 'gerente') {
      preFilter.id = {
        $in: user.responsavel_mercados
      };
    } else if (user.tipo_conta === 'operador') {
      if (user.responsavel_mercados.length > 0) {
        preFilter.id = {
          $in: user.responsavel_mercados
        };
      }
    }
    return preFilter;
  }

  private userHasAccessToId(supermarketId: number) {
    const user = this.clsService.get<UserPayload>('user');
    if (user.tipo_conta === 'admin') {
      return true;
    } else if (user.tipo_conta === 'operador' && user.responsavel_mercados.length === 0) {
      return true;
    } else {
      return user.responsavel_mercados.includes(supermarketId);
    }
  }
}
