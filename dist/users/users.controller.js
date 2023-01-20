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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
const schema_1 = require("../schema");
const roles_1 = require("../auth/roles");
const permissions_1 = require("../auth/permissions");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    createAPP(createUserDto) {
        return this.usersService.createApp(createUserDto);
    }
    findAll(query) {
        return this.usersService.findAll(query);
    }
    findMe() {
        return this.usersService.findMe();
    }
    getList() {
        return this.usersService.getList();
    }
    findByCpfExternal(cpf) {
        return this.usersService.findByCpfExternal(cpf);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
    import(file, query) {
        return this.usersService.import(file, query);
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.User)),
    (0, common_2.Public)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)(common_2.ApiResSchema.apply(schema_1.User)),
    (0, common_2.Public)(),
    (0, common_1.Post)('app'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserAppDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createAPP", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador, roles_1.Role.Cliente),
    (0, permissions_1.Permissions)(permissions_1.Permission.Usuarios),
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.User)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.User)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('eu'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findMe", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Usuarios, permissions_1.Permission.Mercados),
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyArr(schema_1.User)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('listar'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getList", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('cpf/:cpf'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByCpfExternal", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Usuarios),
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.User)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.apply(schema_1.User)),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(common_2.ApiResSchema.applyType('object')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, roles_1.Roles)(roles_1.Role.Admin, roles_1.Role.Operador),
    (0, permissions_1.Permissions)(permissions_1.Permission.Usuarios),
    (0, common_2.ApiFile)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('importar'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ImportQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "import", null);
UsersController = __decorate([
    (0, common_2.ApiController)('Usuários', [schema_1.User]),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map