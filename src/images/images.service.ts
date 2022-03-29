import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageDocument, ProductDocument, SupermarketDocument } from 'src/schema';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch, BulkRemoveDto, generateSearchObject, tryToParse, SearchObj } from 'src/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { UpdateImageDto } from './dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('imagens')
    private schemaModel: Model<ImageDocument>,
    @InjectModel('produtos')
    private productsModel: Model<ProductDocument>,
    @InjectModel('mercados')
    private supermarketsModel: Model<SupermarketDocument>,
    @InjectAwsService(S3) private s3: S3,
    private configService: ConfigService,
  ) { }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    const productSearchKeys = ['descricao'];
    const supermarketSearchKeys = ['nome'];
    const imageSearchKeys = ['codigo_barras', 'id'];
    const searchObj = generateSearchObject(query) as any;

    if (Object.keys(searchObj).some(key => productSearchKeys.includes(key))) {
      const productSearch = this.filterObjectByKeys(searchObj, productSearchKeys);
      const products = await this.productsModel.find(productSearch);

      const imageQuery = tryToParse(query.procurar)
        .filter((searchObj: SearchObj) => imageSearchKeys.includes(searchObj.termo));
      return await findAllWithPaginationSearch(
        this.schemaModel,
        {
          ...query,
          procurar: imageQuery
        },
        '',
        'produto',
        {
          codigo_barras: {
            $in: products.reduce((acc, product) => {
              acc.push(...product.codigo_barras);
              return acc;
            }, [])
          }
        }
      );
    } else if (Object.keys(searchObj).some(key => supermarketSearchKeys.includes(key))) {
      const supermarketSearch = this.filterObjectByKeys(searchObj, supermarketSearchKeys);
      const supermarkets = await this.supermarketsModel.find(supermarketSearch);

      const imageQuery = tryToParse(query.procurar)
        .filter((searchObj: SearchObj) => imageSearchKeys.includes(searchObj.termo));
      return await findAllWithPaginationSearch(
        this.schemaModel,
        {
          ...query,
          procurar: imageQuery
        },
        '',
        'mercado',
        {
          id: {
            $in: supermarkets.map(supermarket => supermarket.id)
          }
        }
      );
    } else {
      return await findAllWithPaginationSearch(this.schemaModel, query, '', 'produto mercado');
    }
  }

  async findOneBySupermarketId(id: number) {
    return await this.schemaModel.findOne({
      categoria: 'logo',
      id,
    })
      .populate('produto mercado');
  }

  async findOneByBarcode(barcode: string) {
    return await this.schemaModel.findOne({
      categoria: 'produto',
      codigo_barras: barcode,
    })
      .populate('produto mercado');
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    let searchObj = Object();
    let message = '';
    if (updateImageDto.codigo_barras) {
      searchObj = {
        _id: { $ne: id },
        codigo_barras: updateImageDto.codigo_barras,
      };
      message = 'Já existe uma imagem com este código de barras.'
    } else {
      searchObj = {
        _id: { $ne: id },
        id: updateImageDto.id
      };
      message = 'Já existe uma imagem com este ID.'
    }

    const exists = await this.schemaModel.exists(searchObj);
    if (exists) {
      throw new BadRequestException({
        mensagem: message,
        dados: {}
      });
    } else {
      return await this.schemaModel.findOneAndUpdate(
        { _id: id },
        updateImageDto,
        { new: true }
      )
        .populate('produto mercado');
    }
  }

  async remove(id: string) {
    const image = await this.schemaModel.findOneAndDelete({ _id: id });
    if (image) {
      this.removeFile(this.getFileNameFromUrl(image.url));
    }
    return {};
  }

  async bulkRemove(bulkRemoveDto: BulkRemoveDto) {
    const images = await this.schemaModel.find({
      _id: {
        $in: bulkRemoveDto.ids
      }
    });
    if (images && images.length > 0) {
      for (const image of images) {
        this.removeFile(this.getFileNameFromUrl(image.url));
      }
    }
    await this.schemaModel.deleteMany({
      _id: {
        $in: bulkRemoveDto.ids
      }
    });
    return {};
  }

  async import(files: Express.Multer.File[]) {
    const bulk = this.schemaModel.collection.initializeUnorderedBulkOp();
    for (const file of files) {
      this.uploadFile(file);
      if (this.isBarcode(file.originalname)) {
        bulk
          .find({
            codigo_barras: this.getIdOrBarcodeFromName(file.originalname)
          })
          .upsert()
          .update({
            $set: {
              url: this.getS3Url(file.originalname),
              categoria: 'produto'
            }
          });

      } else {
        bulk
          .find({
            id: Number(this.getIdOrBarcodeFromName(file.originalname)),
          })
          .upsert()
          .update({
            $set: {
              url: this.getS3Url(file.originalname),
              categoria: 'logo'
            }
          });
      }

    }
    await bulk.execute();
    return {
      erros: {},
      sucessos: {},
    }
  }

  private uploadFile(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Bucket: this.configService.get('aws').bucketName,
        Key: file.originalname,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    })
  }

  private removeFile(fileName: string) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({
        Bucket: this.configService.get('aws').bucketName,
        Key: fileName,
      }, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  private isBarcode(fileName: string) {
    const name = path.parse(fileName).name;
    return name.length > 6 ? true : false;
  }

  private getIdOrBarcodeFromName(fileName: string) {
    return path.parse(fileName).name;
  }

  private getS3Url(fileName: string) {
    const bucketName = this.configService.get('aws').bucketName;
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  }

  private getFileNameFromUrl(url: string) {
    const startIndex = url.lastIndexOf('/') + 1;
    return url.substring(startIndex);
  }

  private filterObjectByKeys(object: any, keys: string[]) {
    return Object.keys(object)
      .filter(key => keys.includes(key))
      .reduce((acc, cur) => Object.assign(acc, { [cur]: object[cur] }), {});
  }
}
