import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema";
import { SignatureSchema } from "src/schema/signature.schema";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'assinaturas', schema: SignatureSchema },
        { name: 'usuarios', schema: UserSchema }
      ]),], controllers: [PaymentsController],providers: [PaymentsService] 
})
export class PaymentsModule{}