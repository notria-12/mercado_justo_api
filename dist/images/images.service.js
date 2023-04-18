"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
const common_2 = require("../common");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const path = require("path");
const fs = require("fs");
let ImagesService = class ImagesService {
    constructor(schemaModel, productsModel, supermarketsModel, s3, configService) {
        this.schemaModel = schemaModel;
        this.productsModel = productsModel;
        this.supermarketsModel = supermarketsModel;
        this.s3 = s3;
        this.configService = configService;
    }
    async findAll(query) {
        const productSearchKeys = ['descricao'];
        const supermarketSearchKeys = ['nome'];
        const imageSearchKeys = ['codigo_barras', 'id'];
        const searchObj = (0, common_2.generateSearchObject)(query);
        if (Object.keys(searchObj).some(key => productSearchKeys.includes(key))) {
            const productSearch = this.filterObjectByKeys(searchObj, productSearchKeys);
            const products = await this.productsModel.find(productSearch);
            const imageQuery = (0, common_2.tryToParse)(query.procurar)
                .filter((searchObj) => imageSearchKeys.includes(searchObj.termo));
            return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, Object.assign(Object.assign({}, query), { procurar: imageQuery }), '', 'produto', {
                codigo_barras: {
                    $in: products.reduce((acc, product) => {
                        acc.push(...product.codigo_barras);
                        return acc;
                    }, [])
                }
            });
        }
        else if (Object.keys(searchObj).some(key => supermarketSearchKeys.includes(key))) {
            const supermarketSearch = this.filterObjectByKeys(searchObj, supermarketSearchKeys);
            const supermarkets = await this.supermarketsModel.find(supermarketSearch);
            const imageQuery = (0, common_2.tryToParse)(query.procurar)
                .filter((searchObj) => imageSearchKeys.includes(searchObj.termo));
            return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, Object.assign(Object.assign({}, query), { procurar: imageQuery }), '', 'mercado', {
                id: {
                    $in: supermarkets.map(supermarket => supermarket.id)
                }
            });
        }
        else {
            return await (0, common_2.findAllWithPaginationSearch)(this.schemaModel, query, '', 'produto mercado');
        }
    }
    async findOneBySupermarketId(id) {
        return await this.schemaModel.findOne({
            categoria: 'logo',
            id,
        })
            .populate('produto mercado');
    }
    async findOneByBarcode(barcode) {
        return await this.schemaModel.findOne({
            categoria: 'produto',
            codigo_barras: barcode,
        })
            .populate('produto mercado');
    }
    async update(id, updateImageDto) {
        let searchObj = Object();
        let message = '';
        if (updateImageDto.codigo_barras) {
            searchObj = {
                _id: { $ne: id },
                codigo_barras: updateImageDto.codigo_barras,
            };
            message = 'Já existe uma imagem com este código de barras.';
        }
        else {
            searchObj = {
                _id: { $ne: id },
                id: updateImageDto.id
            };
            message = 'Já existe uma imagem com este ID.';
        }
        const exists = await this.schemaModel.exists(searchObj);
        if (exists) {
            throw new common_1.BadRequestException({
                mensagem: message,
                dados: {}
            });
        }
        else {
            return await this.schemaModel.findOneAndUpdate({ _id: id }, updateImageDto, { new: true })
                .populate('produto mercado');
        }
    }
    async remove(id) {
        const image = await this.schemaModel.findOneAndDelete({ _id: id });
        if (image) {
            this.removeFile(this.getFileNameFromUrl(image.url));
        }
        return {};
    }
    async bulkRemove(bulkRemoveDto) {
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
    async import(files) {
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
            }
            else {
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
        };
    }
    uploadFile(file) {
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
        });
    }
    removeFile(fileName) {
        return new Promise((resolve, reject) => {
            this.s3.deleteObject({
                Bucket: this.configService.get('aws').bucketName,
                Key: fileName,
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    isBarcode(fileName) {
        const name = path.parse(fileName).name;
        return name.length > 6 ? true : false;
    }
    getIdOrBarcodeFromName(fileName) {
        return path.parse(fileName).name;
    }
    getS3Url(fileName) {
        const bucketName = this.configService.get('aws').bucketName;
        return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    }
    getFileNameFromUrl(url) {
        const startIndex = url.lastIndexOf('/') + 1;
        return url.substring(startIndex);
    }
    filterObjectByKeys(object, keys) {
        return Object.keys(object)
            .filter(key => keys.includes(key))
            .reduce((acc, cur) => Object.assign(acc, { [cur]: object[cur] }), {});
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('imagens')),
    __param(1, (0, mongoose_1.InjectModel)('produtos')),
    __param(2, (0, mongoose_1.InjectModel)('mercados')),
    __param(3, (0, nest_aws_sdk_1.InjectAwsService)(aws_sdk_1.S3)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        aws_sdk_1.S3,
        config_1.ConfigService])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map