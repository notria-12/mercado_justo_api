import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch } from 'src/common';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name)
    private schemaModel: Model<LogDocument>,
  ) { }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query, '');
  }

  async findOne(id: string) {
    return await this.schemaModel.findById(id);
  }

  async remove(id: string) {
    await this.schemaModel.deleteOne({ _id: id });
    return {};
  }
}
