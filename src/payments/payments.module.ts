import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SignatureSchema } from "src/schema/signature.schema";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'assinaturas', schema: SignatureSchema }
      ]),], controllers: [PaymentsController],providers: [PaymentsService] 
})
export class PaymentsModule{}