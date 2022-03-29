import { Injectable } from '@nestjs/common';
import { AccessService } from 'src/access/access.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private accessService: AccessService,
    private usersService: UsersService,
  ) { }

  async findOne() {
    return {
      acessos: await this.accessService.getAccesses(),
      plataforma: {
        usuarios: await this.usersService.getPlataformData()
      }
    }
  }
}
