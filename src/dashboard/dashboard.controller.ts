import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  getKpis() {
    return this.dashboardService.getKpis();
  }

  @Get('charts')
  getCharts(@Query('months') months: number) {
    return this.dashboardService.getCharts(months || 12);
  }

  @Get('alerts')
  getAlerts() {
    return this.dashboardService.getAlerts();
  }
}
