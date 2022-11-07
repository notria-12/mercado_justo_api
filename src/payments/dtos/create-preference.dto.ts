import { IsNotEmpty, IsString } from "src/common";

export class CreatePreferenceDto{
    @IsString()
    @IsNotEmpty()
    email: string
    
}