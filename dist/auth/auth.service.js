"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const schema_1 = require("../schema");
const config_1 = require("@nestjs/config");
const google_auth_library_1 = require("google-auth-library");
const mail_service_1 = require("../mail/mail.service");
const token_service_1 = require("../token/token.service");
const dto_1 = require("../mail/dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const firebase_auth_strategy_1 = require("./firebase/firebase-auth.strategy");
const send_email_token_dto_1 = require("../mail/dto/send-email-token.dto");
const receive_token_dto_1 = require("../mail/dto/receive-token.dto");
const send_sms_token_dto_1 = require("../mail/dto/send-sms-token.dto");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, mailService, tokenService, eventEmitter, firebaseStrategy) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.tokenService = tokenService;
        this.eventEmitter = eventEmitter;
        this.firebaseStrategy = firebaseStrategy;
    }
    async validateUser(cpf, pass) {
        const user = await this.usersService.findByCPFInternal(cpf);
        const isCorrectPassword = bcrypt.compareSync(pass, user.senha);
        if (user && isCorrectPassword) {
            const lastAccessUpdated = await this.usersService.updateLastAccess(user._id);
            const _a = lastAccessUpdated.toObject(), { senha } = _a, result = __rest(_a, ["senha"]);
            return result;
        }
    }
    async login(user) {
        console.log(user);
        this.eventEmitter.emit('access.login', {
            documento: user._id,
            usuario: user._id,
            colecao: 'usuarios'
        });
        console.log('after emitter');
        return {
            access_token: this.generateToken(user),
            usuario: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                orientacao: user.orientacao,
                cpf: user.cpf,
                status_assinante: user.status_assinante,
                ultimo_acesso: user.ultimo_acesso,
                data_cadastro: user.data_cadastro,
                tipo_conta: user.tipo_conta,
                permissoes: user.permissoes,
                responsavel_mercados: user.responsavel_mercados
            }
        };
    }
    generateToken(user) {
        console.log(user);
        return this.jwtService.sign({
            sub: user._id,
            cpf: user.cpf,
            email: user.email,
            status_assinante: user.status_assinante,
            tipo_conta: user.tipo_conta,
            permissoes: user.permissoes,
            responsavel_mercados: user.responsavel_mercados
        });
    }
    async loginGoogle(loginGoogle) {
        if (await this.verifyIdToken(loginGoogle.id_token)) {
            const user = await this.createOrUpdateUser(loginGoogle);
            return this.login(user);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async loginPhone(loginPhone) {
        if (await this.verifyFirebaseToken(loginPhone.firebase_token)) {
            const user = await this.usersService.findByPhoneInternal(loginPhone.phone);
            const response = this.login(user);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async sendEmailToken(email) {
        return await this.mailService.sendEmailToken(email);
    }
    async verifyPhoneNumber(telefone) {
        const user = await this.usersService.findByPhoneInternal(telefone.telefone);
        if (user) {
            return { 'mensagem': 'Código enviado' };
        }
        else {
            throw new common_1.NotFoundException({
                mensagem: 'Telefone não cadastrado',
                dados: {}
            });
        }
    }
    async verifyFirebaseToken(token) {
        try {
            var user = await this.firebaseStrategy.validate(token);
            console.log(user);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async verifyIdToken(token) {
        try {
            const client = new google_auth_library_1.OAuth2Client(this.configService.get('google.client_id'));
            await client.verifyIdToken({
                idToken: token,
                audience: this.configService.get('google.client_id'),
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async createOrUpdateUser(loginGoogle) {
        let user = await this.usersService.findOneByGoogleData(loginGoogle.google_id, loginGoogle.email);
        if (user && !user.google_id) {
            user = await this.usersService.update(user.id, { google_id: loginGoogle.google_id });
        }
        else if (!user) {
            user = await this.usersService.createGoogle(loginGoogle);
        }
        return user;
    }
    validateExternal(access_token) {
        try {
            this.jwtService.verify(access_token, this.configService.get('jwt.secret'));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async sendRecoverPassword(recoverPassword) {
        return await this.mailService.sendRecoverPassword(recoverPassword);
    }
    async confirmRecoverPassword(newPassword) {
        const isTokenValid = await this.tokenService.validate(newPassword.email, newPassword.token);
        if (isTokenValid) {
            await this.usersService.updatePasswordByEmail(newPassword.email, newPassword.senha);
        }
        return {};
    }
    async confirmEmailToken(receiveToken) {
        const isTokenValid = await this.tokenService.validate(receiveToken.email, receiveToken.token);
        if (isTokenValid) {
            const user = await this.usersService.findByEmailInternal(receiveToken.email);
            const response = this.login(user);
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService,
        token_service_1.TokenService,
        event_emitter_1.EventEmitter2,
        firebase_auth_strategy_1.FirebaseAuthStrategy])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map