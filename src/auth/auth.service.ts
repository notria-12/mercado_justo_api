import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schema';
import { ConfigService } from '@nestjs/config';
import { LoginGoogleDto } from './dto';
import { OAuth2Client } from 'google-auth-library';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { NewPasswordDto, RecoverPasswordDto } from 'src/mail/dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginPhoneDto } from './dto/login-phone.dto';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { SendEmailTokenDto } from 'src/mail/dto/send-email-token.dto';
import { ReceiveTokenDto } from 'src/mail/dto/receive-token.dto';
import { template } from 'lodash';
import { SendSmsTokenDto } from 'src/mail/dto/send-sms-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    private tokenService: TokenService,
    private eventEmitter: EventEmitter2,
    private firebaseStrategy: FirebaseAuthStrategy
  ) { }

  async validateUser(cpf: string, pass: string): Promise<any> {

    const user = await this.usersService.findByCPFInternal(cpf);
    const isCorrectPassword = bcrypt.compareSync(pass, user.senha);
    if (user && isCorrectPassword ) {
      const lastAccessUpdated = await this.usersService.updateLastAccess(user._id);
      const { senha, ...result } = lastAccessUpdated.toObject();
      return result;
    }
    // return user;
  }

  async login(user: UserDocument) {
    console.log(user);
    this.eventEmitter.emit(
      'access.login',
      {
        documento: user._id,
        usuario: user._id,
        colecao: 'usuarios'
      }
    );
    console.log('after emitter')
    return {
      access_token: this.generateToken(user),
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        status_assinante: user.status_assinante,
        ultimo_acesso: user.ultimo_acesso,
        tipo_conta: user.tipo_conta,
        permissoes: user.permissoes,
        responsavel_mercados: user.responsavel_mercados
      }
    };
  }

  private generateToken(user: UserDocument) {
    console.log(user)
     return this.jwtService.sign({
      sub: user._id,
      cpf: user.cpf,
      email: user.email,
      status_assinante: user.status_assinante,
      tipo_conta: user.tipo_conta,
      permissoes: user.permissoes,
      responsavel_mercados: user.responsavel_mercados
    })
  }

  async loginGoogle(loginGoogle: LoginGoogleDto) {
    if (await this.verifyIdToken(loginGoogle.id_token)) {
      const user = await this.createOrUpdateUser(loginGoogle);
      return this.login(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async loginPhone(loginPhone: LoginPhoneDto) {
    if (await this.verifyFirebaseToken(loginPhone.firebase_token)) {
      const user = await this.usersService.findByPhoneInternal(loginPhone.phone);
      const response  = this.login(user);
      return response;
    } else {
      throw new UnauthorizedException();
    }
  }

  async sendEmailToken(email: SendEmailTokenDto){
    return await this.mailService.sendEmailToken(email);
  }

   async verifyPhoneNumber(telefone: SendSmsTokenDto){
    const user = await this.usersService.findByPhoneInternal(telefone.telefone);
    if(user){
      return {'mensagem': 'Código enviado'}
    }else{
      throw new NotFoundException({
        mensagem: 'Telefone não cadastrado',
        dados: {}
      });
    }

  }

  private async verifyFirebaseToken(token: string){
    try{
    var user = await this.firebaseStrategy.validate(token);
    console.log(user);
      return true;
    }catch(error){
      return false;
    }
  }

  private async verifyIdToken(token: string) {
    try {
      const client = new OAuth2Client(this.configService.get('google.client_id'))
      await client.verifyIdToken({
        idToken: token,
        audience: this.configService.get('google.client_id'),
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async createOrUpdateUser(loginGoogle: LoginGoogleDto) {
    let user = await this.usersService.findOneByGoogleData(
      loginGoogle.google_id,
      loginGoogle.email
    );

    if (user && !user.google_id) {
      // @ts-ignore
      user = await this.usersService.update(user.id, { google_id: loginGoogle.google_id })
    } else if (!user) {
      user = await this.usersService.createGoogle(loginGoogle)
    }
    return user;
  }

  validateExternal(access_token: string) {
    try {
      this.jwtService.verify(access_token, this.configService.get('jwt.secret'))
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendRecoverPassword(recoverPassword: RecoverPasswordDto) {
    return await this.mailService.sendRecoverPassword(recoverPassword);
  }

  async confirmRecoverPassword(newPassword: NewPasswordDto) {
    const isTokenValid = await this.tokenService.validate(newPassword.email, newPassword.token);
    if (isTokenValid) {
      await this.usersService.updatePasswordByEmail(newPassword.email, newPassword.senha);
    }
    return {};
  }

  async confirmEmailToken(receiveToken: ReceiveTokenDto) {
    const isTokenValid = await this.tokenService.validate(receiveToken.email, receiveToken.token);
    if (isTokenValid) {
      const user = await this.usersService.findByEmailInternal(receiveToken.email);
      const response  = this.login(user);
      return response;
    }else {
      throw new UnauthorizedException();
    }
  }
}