import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResSchema, ApiController } from 'src/common';
import { DashboardResponse } from './entities';
import { Roles, Role } from 'src/auth/roles';

@ApiController('Dashboard', [DashboardResponse], true)
@Roles(Role.Admin, Role.Cliente)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @ApiOkResponse(ApiResSchema.apply(DashboardResponse))
  @Get()
  findOne() {
    return this.dashboardService.findOne();
  }
}
