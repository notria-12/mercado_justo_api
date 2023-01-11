import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClsService } from "nestjs-cls";
import { SupermarketDocument } from "src/schema";
import { SupermarketsImport } from "src/supermarkets/supermarkets.import";

@Injectable()
export class PublicSupermarketsService{
    constructor(
        @InjectModel('mercados')
        private schemaModel: Model<SupermarketDocument>,
       
      ) { }

   async findPublicSupermarkets(){
    return await this.schemaModel.find({ordem: { $ne: null }}).sort({'ordem': 1}).limit(20);
   }

}