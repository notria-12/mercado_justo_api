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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const common_2 = require("../../common");
const entities_1 = require("../entities");
const role_enum_1 = require("./role.enum");
const roles_decorator_1 = require("./roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.AppOriginsRolesRelation = {
            'ADMIN_MERCADO_JUSTO': [role_enum_1.Role.Admin, role_enum_1.Role.Operador, role_enum_1.Role.Gerente],
            'SWAGGER_MERCADO_JUSTO': [role_enum_1.Role.Admin, role_enum_1.Role.Operador, role_enum_1.Role.Gerente],
            'APP_MERCADO_JUSTO': [role_enum_1.Role.Admin, role_enum_1.Role.Operador, role_enum_1.Role.Gerente, role_enum_1.Role.Cliente]
        };
    }
    canActivate(context) {
        if (!this.isRoleCompatibleWithOrigin(context)) {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui acesso a este recurso.',
                dados: {}
            });
        }
        if (!this.hasAccessPlan(context)) {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui assinatura.',
                dados: {}
            });
        }
        if (!this.hasAccessLevel(context)) {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui nivel de acesso a este recurso.',
                dados: {}
            });
        }
        return true;
    }
    isRoleCompatibleWithOrigin(context) {
        const controller = context.getClass().name;
        const isPublic = this.reflector.getAllAndOverride(common_2.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const { user, headers } = context.switchToHttp().getRequest();
        const origin = headers['x-app-origem'];
        const role = user.tipo_conta;
        if (controller == 'AuthController') {
            return true;
        }
        if (role && (!origin || !Object.keys(this.AppOriginsRolesRelation).includes(origin))) {
            return role === 'admin';
        }
        else if (isPublic) {
            if (origin) {
                return Object.keys(this.AppOriginsRolesRelation).includes(origin);
            }
            else {
                return false;
            }
        }
        else {
            return this.AppOriginsRolesRelation[origin].includes(role);
        }
    }
    hasAccessPlan(context) {
        const noAccessPlan = this.reflector.getAllAndOverride(common_2.NO_ACCESS_PLAN, [
            context.getHandler(),
            context.getClass(),
        ]);
        const { user } = context.switchToHttp().getRequest();
        if (noAccessPlan) {
            return true;
        }
        return true;
    }
    hasAccessLevel(context) {
        const { user } = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles);
        if (!requiredRoles || user.tipo_conta === 'admin') {
            return true;
        }
        return requiredRoles.some((role) => { var _a; return (_a = user.tipo_conta) === null || _a === void 0 ? void 0 : _a.includes(role); });
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map