import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch, BulkRemoveDto } from 'src/common';
import { ProductsImport } from './products.import';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('produtos')
    private schemaModel: Model<ProductDocument>,
    private productsImport: ProductsImport
  ) { }

  async create(createProductDto: CreateProductDto) {
    if (typeof createProductDto.ordem === 'number') {
      if (!(await this.isProductPosAvailable(createProductDto))) {
        throw new BadRequestException({
          mensagem: 'Já existe um produto nesta ordem.',
          dados: {}
        });
      }
    }

    const exists = await this.schemaModel.exists({
      codigo_barras: {
        $in: createProductDto.codigo_barras,
      },
      cidade: createProductDto.cidade
    });

    if (exists) {
      return await this.schemaModel.findOneAndUpdate(
        {
          codigo_barras: {
            $in: createProductDto.codigo_barras,
          },
          cidade: createProductDto.cidade
        },
        createProductDto,
        { new: true }
      );
    } else {
      const newProduct = new this.schemaModel({
        ...createProductDto,
      });
      return await newProduct.save();
    }
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query);
  }
  

  async findOne(id: string) {
    return await this.schemaModel.findById(id);
  }
  async findByCategory(category: string){
    
    return await this.schemaModel.find({$or: [{categoria_1: category}, {categoria_2: category}]})
  }

  async getList() {
    return await this.schemaModel.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          value: '$_id',
          text: '$nome'
        }
      }
    ]);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (typeof updateProductDto.ordem === 'number') {
      if (!(await this.isProductPosAvailable(updateProductDto, id))) {
        throw new BadRequestException({
          mensagem: 'Já existe um produto nesta ordem.',
          dados: {}
        });
      }
    }
    return await this.schemaModel.findOneAndUpdate(
      { _id: id },
      updateProductDto,
      { new: true }
    );
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
    return await this.productsImport.import(file);
  }

  private async isProductPosAvailable(product: CreateProductDto | UpdateProductDto, id: string = null) {
    if (id) {
      return !(await this.schemaModel.exists({
        _id: { $ne: id },
        cidade: product.cidade,
        ordem: product.ordem
      }));
    } else {
      return !(await this.schemaModel.exists({
        cidade: product.cidade,
        ordem: product.ordem
      }));
    }
  }
}
