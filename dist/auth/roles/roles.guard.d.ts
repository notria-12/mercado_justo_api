import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private AppOriginsRolesRelation;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
    private isRoleCompatibleWithOrigin;
    private hasAccessPlan;
    private hasAccessLevel;
}
