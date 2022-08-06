import { IsNotEmpty, IsString } from "src/common";

export class LoginPhoneDto{
    @IsNotEmpty()
    @IsString()
    firebase_token: string; 
    @IsNotEmpty()
    @IsString()
    phone: string; 

}