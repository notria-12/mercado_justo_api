import { CreateTokenDto } from './dto';
import { Model } from 'mongoose';
import { TokenDocument } from 'src/schema';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class TokenService {
    private schemaModel;
    private usersService;
    private configService;
    constructor(schemaModel: Model<TokenDocument>, usersService: UsersService, configService: ConfigService);
    private tokenExpiresIn;
    create(createTokenDto: CreateTokenDto): Promise<string | false>;
    validate(email: string, token: string): Promise<boolean>;
    findAll(): Promise<(import("src/schema").Token & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("src/schema").Token & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: number): Promise<{}>;
    private generateToken;
    private isTokenValid;
}
