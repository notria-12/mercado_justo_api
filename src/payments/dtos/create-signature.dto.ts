import { IsNotEmpty, IsString } from "src/common";

export class CreateSignatureDto{
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    card_token: string
    @IsString()
    @IsNotEmpty()
    id_usuario: string

}