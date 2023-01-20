import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    findOne(): Promise<{
        acessos: import("../access/entities").AccessResponse;
        plataforma: {
            usuarios: any;
        };
    }>;
}
