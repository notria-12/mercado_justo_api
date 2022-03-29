import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDocument } from 'src/schema';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('tokens')
    private schemaModel: Model<TokenDocument>,
    private usersService: UsersService,
    private configService: ConfigService,
  ) { }

  private tokenExpiresIn = this.configService.get<number>('token.expiresIn');

  async create(createTokenDto: CreateTokenDto) {
    const user = await this.usersService.findByEmailInternal(createTokenDto.email);
    if (user) {
      const tokenString = this.generateToken();
      const token = new this.schemaModel({
        ...createTokenDto,
        token: bcrypt.hashSync(tokenString, bcrypt.genSaltSync()),
      });
      token.save();
      return tokenString;
    } else {
      return false;
    }
  }

  async validate(email: string, token: string) {
    const tokenDocument = await this.schemaModel
      .findOne({ email })
      .sort({ _id: 'desc' });
    if (tokenDocument) {
      const isTokenValid = this.isTokenValid(tokenDocument, token);
      if (isTokenValid) {
        await this.schemaModel.updateOne(
          { _id: tokenDocument._id },
          { usado: true }
        );
      }
      return isTokenValid;
    } else {
      return false;
    }
  }

  async findAll() {
    return await this.schemaModel.find();
  }

  async findOne(id: string) {
    return await this.schemaModel.findById(id);
  }

  async remove(id: number) {
    await this.schemaModel.deleteOne({ _id: id });
    return {};
  }

  private generateToken() {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const tokenLength = this.configService.get<number>('token.length');
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.round(Math.random() * (possibleChars.length - 1));
      token += possibleChars[randomIndex];
    }
    return token;
  }

  private isTokenValid(tokenDocument: TokenDocument, tokenString: string) {
    return tokenDocument
      && tokenDocument.data_criado > new Date(Date.now() - this.tokenExpiresIn)
      && tokenDocument.usado == false
      && bcrypt.compareSync(tokenString, tokenDocument.token)
  }
}
