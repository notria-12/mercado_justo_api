import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch } from 'src/common';
import { Types } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categorias')
    private schemaModel: Model<CategoryDocument>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.schemaModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query, '', {
      path: 'pai',
      populate: {
        path: 'pai'
      }
    });
  }

  async findOne(id: string) {
    return await this.schemaModel.findById(id).populate({
      path: 'pai',
      populate: {
        path: 'pai'
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.schemaModel.findOneAndUpdate(
      { _id: id },
      updateCategoryDto,
      { new: true }
    ).populate({
      path: 'pai',
      populate: {
        path: 'pai'
      }
    });
  }

  async remove(id: string) {
    const subCategories_1 = await this.schemaModel.find({ pai: id });
    const subCategories_2 = await this.schemaModel.find({
      pai: {
        $in: subCategories_1.map(sub => sub._id)
      }
    });
    const categoriesIds = [
      ...subCategories_1.map(sub => sub._id),
      ...subCategories_2.map(sub => sub._id),
      id
    ];

    if (categoriesIds) {
      return await this.schemaModel.deleteMany({
        _id: {
          $in: categoriesIds
        }
      })
    }
    return {};
  }
}
