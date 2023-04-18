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
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_decorator_1 = require("./permissions.decorator");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        if (!this.hasPermission(context)) {
            throw new common_1.ForbiddenException({
                mensagem: 'Você não possui permissão a este recurso.',
                dados: {}
            });
        }
        return true;
    }
    hasPermission(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (user.tipo_conta === 'admin' || user.permissoes.some(permissions => permissions.includes('todas'))) {
            return true;
        }
        console.log(requiredPermissions);
        console.log(user);
        return requiredPermissions.some((permission) => {
            var _a;
            return (_a = user.permissoes) === null || _a === void 0 ? void 0 : _a.some((userPermission) => userPermission.includes(permission));
        });
    }
};
PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map