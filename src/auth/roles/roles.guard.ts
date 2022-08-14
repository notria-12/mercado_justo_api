import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, NO_ACCESS_PLAN } from 'src/common';
import { UserPayload } from 'src/auth/entities';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private AppOriginsRolesRelation = {
    'ADMIN_MERCADO_JUSTO': [Role.Admin, Role.Operador, Role.Gerente],
    'SWAGGER_MERCADO_JUSTO': [Role.Admin, Role.Operador, Role.Gerente],
    'APP_MERCADO_JUSTO': [Role.Admin, Role.Operador, Role.Gerente, Role.Cliente]
  }

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    if (!this.isRoleCompatibleWithOrigin(context)) {
      throw new ForbiddenException({
        mensagem: 'Você não possui acesso a este recurso.',
        dados: {}
      });
    }

    if (!this.hasAccessPlan(context)) {
      throw new ForbiddenException({
        mensagem: 'Você não possui assinatura.',
        dados: {}
      });
    }

    if (!this.hasAccessLevel(context)) {
      throw new ForbiddenException({
        mensagem: 'Você não possui nivel de acesso a este recurso.',
        dados: {}
      });
    }
    return true;
  }

  private isRoleCompatibleWithOrigin(context: ExecutionContext) {
    const controller = context.getClass().name;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user, headers }: { user: UserPayload, headers: any[] } = context.switchToHttp().getRequest();
    const origin = headers['x-app-origem'];
    const role = user.tipo_conta;

    // allows login
    if (controller == 'AuthController') {
      return true;
    }

    // direct access to API
    if (role && (!origin || !Object.keys(this.AppOriginsRolesRelation).includes(origin))) {
      return role === 'admin';
    }
    // public data accessible only to apps listed
    else if (isPublic) {
      if (origin) {
        return Object.keys(this.AppOriginsRolesRelation).includes(origin);
      } else {
        return false;
      }
    }
    else {
      return this.AppOriginsRolesRelation[origin].includes(role);
    }
  }

  private hasAccessPlan(context: ExecutionContext) {
    const noAccessPlan = this.reflector.getAllAndOverride<boolean>(NO_ACCESS_PLAN, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user }: { user: UserPayload } = context.switchToHttp().getRequest();

    if (noAccessPlan) {
      return true;
    } else if (user.tipo_conta === 'cliente' && !user.status_assinante) {
      return false;
    } else {
      return true;
    }
  }

  private hasAccessLevel(context: ExecutionContext) {
    const { user }: { user: UserPayload } = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || user.tipo_conta === 'admin') {
      return true;
    }
    return requiredRoles.some((role) => user.tipo_conta?.includes(role));
  }
}