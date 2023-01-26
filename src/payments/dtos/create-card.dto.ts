import { IsNotEmpty, IsString } from "class-validator"

export class CreateCardDto{
    @IsString()
    @IsNotEmpty()
    card_number: string
    @IsString()
    @IsNotEmpty()
    user_id: string
    @IsString()
    @IsNotEmpty()
    expiration_month: string
    @IsString()
    @IsNotEmpty()
    expiration_year: string
    @IsString()
    @IsNotEmpty()
    security_code: string

}

