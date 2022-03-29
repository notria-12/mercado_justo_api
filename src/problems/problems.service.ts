import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProblemDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch, BulkRemoveDto } from 'src/common';
import { UserPayload } from 'src/auth/entities';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel('problemas')
    private schemaModel: Model<ProblemDocument>,
    private clsService: ClsService,
  ) { }

  async create(createProblemDto: CreateProblemDto) {
    const exists = await this.schemaModel.exists(createProblemDto);

    if (exists) {
      return await this.schemaModel.findOneAndUpdate(
        createProblemDto,
        {
          ...createProblemDto,
          data_hora: new Date()
        },
        { new: true }
      );
    } else {
      const newProblem = new this.schemaModel(createProblemDto);
      return await newProblem.save();
    }
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    let preFilter = Object();
    const user = this.clsService.get<UserPayload>('user');
    if (user.tipo_conta === 'cliente' || user.tipo_conta === 'gerente') {
      preFilter.usuario = user.userId;
    }
    return await findAllWithPaginationSearch(this.schemaModel, query, '', '', preFilter);
  }

  async findOne(id: string) {
    let filter = Object({ _id: id });
    const user = this.clsService.get<UserPayload>('user');
    if (user.tipo_conta === 'cliente' || user.tipo_conta === 'gerente') {
      filter.usuario = user.userId;
    }
    return await this.schemaModel.findOne(filter);
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
}
