import { AccessService } from 'src/access/access.service';
import { UsersService } from 'src/users/users.service';
export declare class DashboardService {
    private accessService;
    private usersService;
    constructor(accessService: AccessService, usersService: UsersService);
    findOne(): Promise<{
        acessos: import("../access/entities").AccessResponse;
        plataforma: {
            usuarios: any;
        };
    }>;
}
