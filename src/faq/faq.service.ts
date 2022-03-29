import { Injectable } from '@nestjs/common';
import { CreateFaqDto, UpdateFaqDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQDocument } from 'src/schema';
import { FindAllSearchDto, findAllWithPaginationSearch, PaginationDto } from 'src/common';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel('perguntas-frequentes')
    private schemaModel: Model<FAQDocument>,
  ) { }

  async create(createFaqDto: CreateFaqDto) {
    const newFaq = new this.schemaModel(createFaqDto);
    return await newFaq.save();
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query);
  }

  async findOne(id: string) {
    return await this.schemaModel.findById(id);
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    return await this.schemaModel.findOneAndUpdate(
      { _id: id },
      updateFaqDto,
      { new: true }
    );
  }

  async remove(id: string) {
    await this.schemaModel.deleteOne({ _id: id });
    return {};
  }
}
