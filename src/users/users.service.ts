import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserAppDto, CreateUserDto, ImportQueryDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema';
import * as bcrypt from 'bcrypt';
import { PaginationDto, FindAllSearchDto, findAllWithPaginationSearch } from 'src/common';
import { LoginGoogleDto } from 'src/auth/dto';
import { UserPayload } from 'src/auth/entities';
import { ClsService } from 'nestjs-cls';
import { UsersImport } from './users.import';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('usuarios')
    private schemaModel: Model<UserDocument>,
    private clsService: ClsService,
    private usersImport: UsersImport
  ) { }

  async createApp(createUserDto: CreateUserAppDto) {
    const exists = await this.schemaModel.findOne({
      $or: [
        { email: createUserDto.email },
        { cpf: createUserDto.cpf },
        {telefone: createUserDto.telefone}
      ]
    });
    if (exists) {
      throw new ConflictException({
        mensagem: 'E-mail e/ou CPF ou telefone já utilizado.',
        dados: {}
      });
    }
    const accountType = this.clsService.get<UserPayload>('user').tipo_conta;
    
    const newUser = new this.schemaModel({
      ...createUserDto,
      // senha: bcrypt.hashSync(createUserDto.senha, bcrypt.genSaltSync()),
      // responsavel_mercados: accountType !== 'admin'
      //   ? []
      //   : accountType === 'admin' && createUserDto.responsavel_mercados
      //     ? createUserDto.responsavel_mercados
      //     : [],
      permissoes: accountType !== 'admin'
        ? []
        : accountType === 'admin' && createUserDto.permissoes
          ? createUserDto.permissoes
          : [],
      tipo_conta: accountType !== 'admin'
        ? 'cliente'
        : accountType === 'admin' && createUserDto.tipo_conta
          ? createUserDto.tipo_conta
          : 'cliente',
    });
    const { senha, ...user } = (await (await newUser.save()).populate('mercado')).toObject();
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const exists = await this.schemaModel.findOne({
      $or: [
        { email: createUserDto.email },
        { cpf: createUserDto.cpf }
      ]
    });
    if (exists) {
      throw new ConflictException({
        mensagem: 'E-mail e/ou CPF já utilizado.',
        dados: {}
      });
    }
    const accountType = this.clsService.get<UserPayload>('user').tipo_conta;
    
    const newUser = new this.schemaModel({
      ...createUserDto,
      senha: bcrypt.hashSync(createUserDto.senha, bcrypt.genSaltSync()),
      responsavel_mercados: accountType !== 'admin'
        ? []
        : accountType === 'admin' && createUserDto.responsavel_mercados
          ? createUserDto.responsavel_mercados
          : [],
      permissoes: accountType !== 'admin'
        ? []
        : accountType === 'admin' && createUserDto.permissoes
          ? createUserDto.permissoes
          : [],
      tipo_conta: accountType !== 'admin'
        ? 'cliente'
        : accountType === 'admin' && createUserDto.tipo_conta
          ? createUserDto.tipo_conta
          : 'cliente',
    });
    const { senha, ...user } = (await (await newUser.save()).populate('mercado')).toObject();
    return user;
  }

  async createGoogle(createUser: LoginGoogleDto) {
    delete createUser.id_token;
    const user = new this.schemaModel({
      ...createUser
    })
    return await user.save();
  }

  async findAll(query: PaginationDto & FindAllSearchDto) {
    return await findAllWithPaginationSearch(this.schemaModel, query, '-senha', 'mercado');
  }

  async findOne(id: string) {
    const { senha, ...user } = (await this.schemaModel.findById(id).populate('mercado') ).toObject();
    return user;
  }

  async findMe() {
    const userId = this.clsService.get<UserPayload>('user').userId;
    const { senha, ...user } = (await this.schemaModel.findById(userId).populate('mercado')).toObject();
    return user;
  }

  async getList() {
    return await this.schemaModel.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          value: '$_id',
          text: '$nome'
        }
      }
    ]);
  }

  async findByEmailInternal(email: string) {
    return await this.schemaModel.findOne({ email });
  }

  async findByPhoneInternal(telefone: string) {
    return await this.schemaModel.findOne({ telefone });
  }

  async findByCPFInternal(cpf: string) {
    console.log(cpf)
    return await this.schemaModel.findOne({ cpf });
  }

  async findByEmailExternal(email: string) {
    return await this.schemaModel.exists({ email });
  }

  async findByCpfExternal(cpf: string) {
    return await this.schemaModel.exists({ cpf });
  }

  async findOneByGoogleData(google_id: string, email: string) {
    return this.schemaModel.findOne({
      $or: [
        { email },
        { google_id }
      ]
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const emailExists = await this.schemaModel.findOne({ email: updateUserDto.email });
      if (emailExists && emailExists._id != id) {
        throw new ConflictException({ mensagem: 'Este email já está sendo usado.', dados: {} });
      }
    }
    if (updateUserDto.cpf) {
      const cpfExists = await this.schemaModel.findOne({ cpf: updateUserDto.cpf });
      if (cpfExists && cpfExists._id != id) {
        throw new ConflictException({ mensagem: 'Este CPF já está sendo usado.', dados: {} });
      }
    }
    if (updateUserDto.telefone) {
      const phoneExists = await this.schemaModel.findOne({ telefone: updateUserDto.telefone });
      if (phoneExists && phoneExists._id != id) {
        throw new ConflictException({ mensagem: 'Este telefone já está sendo usado.', dados: {} });
      }
    }
    if (updateUserDto.senha) {
      const hash = bcrypt.hashSync(updateUserDto.senha, bcrypt.genSaltSync());
      updateUserDto.senha = hash;
    }

    const user = this.clsService.get<UserPayload>('user');
    if (user.tipo_conta !== 'admin') {
      id = user.userId;
      delete updateUserDto.permissoes;
      delete updateUserDto.tipo_conta;
    }

    const { senha, ...updatedUser } = (await this.schemaModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    ).populate('mercado')).toObject();
    return updatedUser;
  }

  async updatePasswordByEmail(email: string, password: string) {
    return await this.schemaModel.updateOne(
      { email },
      {
        senha: bcrypt.hashSync(password, bcrypt.genSaltSync())
      }
    )
  }

  async updateLastAccess(id: string) {
    return await this.schemaModel.findOneAndUpdate(
      { _id: id },
      { ultimo_acesso: new Date() },
      { new: true }
    );
  }

  async remove(id: string) {
    const userPayload = this.clsService.get<UserPayload>('user');
    if (userPayload.tipo_conta !== 'admin') {
      id = userPayload.userId;
    }

    await this.schemaModel.deleteOne({ _id: id });
    return {};
  }

  async import(file: Express.Multer.File, query: ImportQueryDto) {
    this.usersImport.setAccountType(query.tipo_conta);
    return await this.usersImport.import(file);
  }

  async getPlataformData() {
    return (await this.schemaModel.aggregate([
      {
        $facet: {
          assinaturas: [
            {
              $match: {
                data_assinatura: { $exists: true },
                status_assinante: true
              }
            },
            { $unset: 'senha' },
            {
              $group: {
                _id: {
                  mes: { $month: '$data_assinatura' },
                  ano: { $year: '$data_assinatura' },
                },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                mes: '$_id.mes',
                ano: '$_id.ano',
                total: 1
              }
            },
            { $sort: { ano: 1, mes: 1 } }
          ],
          cadastros: [
            { $unset: 'senha' },
            {
              $group: {
                _id: {
                  mes: { $month: '$data_cadastro' },
                  ano: { $year: '$data_cadastro' },
                },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                mes: '$_id.mes',
                ano: '$_id.ano',
                total: 1
              }
            },
            { $sort: { ano: 1, mes: 1 } }
          ],
          cancelamentos: [
            {
              $match: {
                data_assinatura_cancelada: { $exists: true },
                status_assinante: false
              }
            },
            { $unset: 'senha' },
            {
              $group: {
                _id: {
                  mes: { $month: '$data_assinatura_cancelada' },
                  ano: { $year: '$data_assinatura_cancelada' },
                },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                mes: '$_id.mes',
                ano: '$_id.ano',
                total: 1
              }
            },
            { $sort: { ano: 1, mes: 1 } }
          ],
        },
      }
    ]))[0];
  }
}
