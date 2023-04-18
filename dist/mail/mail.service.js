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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const users_service_1 = require("../users/users.service");
const token_service_1 = require("../token/token.service");
let MailService = class MailService {
    constructor(mailerService, usersService, tokenService) {
        this.mailerService = mailerService;
        this.usersService = usersService;
        this.tokenService = tokenService;
    }
    async sendRecoverPassword(recoverPassword) {
        const user = await this.usersService.findByEmailInternal(recoverPassword.email);
        if (user) {
            const tokenString = await this.tokenService.create({
                email: user.email,
                tipo: 'recuperar-senha'
            });
            if (tokenString) {
                const url = `https://mercadojustoapp.com.br/recuperar-senha?email=${user.email}&token=${tokenString}`;
                this.mailerService.sendMail({
                    to: user.email,
                    subject: 'Esqueceu sua senha? Mercado Justo',
                    template: 'recover-password',
                    context: {
                        name: user.nome,
                        url: url,
                        token: tokenString
                    },
                });
                return { 'mensagem': 'Token enviado com sucesso' };
            }
        }
        return { 'mensagem': 'Erro ao enviar token', 'detalhe': 'email não cadastrado' };
    }
    async sendEmailToken(sendEmailToken) {
        const user = await this.usersService.findByEmailInternal(sendEmailToken.email);
        if (user) {
            const tokenString = await this.tokenService.create({
                email: user.email,
                tipo: 'login-email'
            });
            if (tokenString) {
                this.mailerService.sendMail({
                    to: user.email,
                    subject: 'Código de login - Mercado Justo',
                    template: 'login-token',
                    context: {
                        name: user.nome,
                        token: tokenString
                    },
                });
                return { 'mensagem': 'Token enviado com sucesso' };
            }
        }
        throw new common_1.NotFoundException({
            mensagem: 'E-mail não cadastrado.',
            dados: {}
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        users_service_1.UsersService,
        token_service_1.TokenService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map