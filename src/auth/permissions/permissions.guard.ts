import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPayload } from '../entities';
import { Permission } from './permission.enum';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    if (!this.hasPermission(context)) {
      throw new ForbiddenException({
        mensagem: 'Você não possui permissão a este recurso.',
        dados: {}
      });
    }
    return true;
  }

  private hasPermission(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const { user }: { user: UserPayload } = context.switchToHttp().getRequest();
    if (user.tipo_conta === 'admin' || user.permissoes.some(permissions => permissions.includes('todas'))) {
      return true;
    }
    console.log(requiredPermissions)
    console.log(user)
    return requiredPermissions.some(
      (permission) => user.permissoes?.some(
        (userPermission) => userPermission.includes(permission)
      )
    );
  }
}

