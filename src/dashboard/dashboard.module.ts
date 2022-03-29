import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AccessModule } from 'src/access/access.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AccessModule,
    UsersModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
