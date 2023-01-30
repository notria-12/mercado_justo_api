import { IsCreditCard, IsInstance, IsJSON, IS_CREDIT_CARD } from "class-validator";
import { IsNotEmpty, IsString } from "src/common";
import { CreateCardDto } from "./create-card.dto";

export class CreateSignatureDto{
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    id_usuario: string
    @IsInstance(CreateCardDto)
    @IsNotEmpty()
    card: CreateCardDto

}