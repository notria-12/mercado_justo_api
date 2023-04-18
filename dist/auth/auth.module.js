"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const passport_1 = require("@nestjs/passport");
const local_1 = require("./local");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_2 = require("./jwt");
const core_1 = require("@nestjs/core");
const roles_1 = require("./roles");
const permissions_1 = require("./permissions");
const mail_module_1 = require("../mail/mail.module");
const token_module_1 = require("../token/token.module");
const firebase_auth_strategy_1 = require("./firebase/firebase-auth.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => configService.get('jwt'),
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService]
            }),
            config_1.ConfigModule,
            mail_module_1.MailModule,
            token_module_1.TokenModule
        ],
        providers: [
            auth_service_1.AuthService,
            local_1.LocalStrategy,
            jwt_2.JwtStrategy,
            firebase_auth_strategy_1.FirebaseAuthStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_2.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_1.PermissionsGuard,
            },
        ],
        controllers: [
            auth_controller_1.AuthController
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map