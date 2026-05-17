import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getDashboardKpis(): Promise<any>;
    getMonthlyRevenue(months: number): Promise<any[]>;
    getFinancialPerVehicle(): Promise<any[]>;
    getMileagePerVehicle(): Promise<any[]>;
}
