import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTermsUseDto, UpdateTermsUseDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TermsUseDocument } from 'src/schema';

@Injectable()
export class TermsUseService {
  constructor(
    @InjectModel('termos-uso')
    private schemaModel: Model<TermsUseDocument>,
  ) { }

  async create(createTermsUseDto: CreateTermsUseDto) {
    const exists = await this.schemaModel.exists({});
    if (!exists) {
      const newTermsUse = new this.schemaModel(createTermsUseDto);
      return await newTermsUse.save();
    } else {
      throw new BadRequestException({
        mensagem: 'Você não pode criar outro termos de uso.',
        dados: {}
      });
    }
  }

  async findOne() {
    return await this.schemaModel.findOne();
  }

  async update(updateTermsUseDto: UpdateTermsUseDto) {
    return await this.schemaModel.findOneAndUpdate(
      {},
      updateTermsUseDto,
      {
        new: true,
        upsert: true
      }
    );
  }

  async remove() {
    await this.schemaModel.deleteOne({});
    return {};
  }
}
