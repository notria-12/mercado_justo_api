import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PriceDocument } from "src/schema";

@Injectable()
export class PublicPricesService{
    constructor(
        @InjectModel('precos')
        private schemaModel: Model<PriceDocument>,
       
      ) { }

      async findSpecificPrices(productIds: string[], marketsIds:  number[]) {
      
        let prices = await this.schemaModel.find({
          
            "id": {$in: marketsIds}, "produto": {$in: productIds}
          
        });
        
        let ordenedPrices = [];
        productIds.forEach((productId, index) =>{
         let pricesByProducts = prices.filter((price) => price.produto == productId);
          marketsIds.forEach((marketsId) => {
            if(pricesByProducts.filter((price) => price.id == marketsId).length == 0){
              let newPrice = Object.assign({}, prices[0]);
              newPrice.id = marketsId,
              newPrice.preco = 'Em Falta'
              newPrice.produto = productId;
              
              pricesByProducts.push(newPrice)
            }
          })
          ordenedPrices.push(pricesByProducts.sort((a,b) => a.id - b.id));
        })

        let newPrices = [];
 
        for(let index = 0; index < ordenedPrices.length; index++){
          
         let auxPrices=[];
          for(let marketId of marketsIds){

            let priceByMarket = ordenedPrices[index].filter((price)=>{
              return price.id == marketId
            });
            
            auxPrices.push(priceByMarket[0]);    
          }
          
          newPrices[index] = auxPrices;
        }
        
        return newPrices; 
      }
}