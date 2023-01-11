import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { ProductDocument } from "src/schema";

@Injectable()
export class PublicProductsService{
    constructor(
        @InjectModel('produtos')
        private schemaModel: Model<ProductDocument>,
        
      ) { }

      async findPublicsProducts(){
        return await this.schemaModel.find({ordem: { $ne: null }}).sort({'ordem': 1}).limit(20);
    
      }
}