import { IsNotEmpty, IsString } from "src/common";

export class GetProductsDto{
    @IsNotEmpty()
    @IsString()
    categoria: string;
}