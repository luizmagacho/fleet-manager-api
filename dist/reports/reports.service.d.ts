import { Model } from 'mongoose';
import { MaintenanceDocument } from '../maintenances/schemas/maintenance.schema';
import { DriversService } from '../drivers/drivers.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { RentalsService } from '../rentals/rentals.service';
export declare class ReportsService {
    private maintenanceModel;
    private driversService;
    private vehiclesService;
    private rentalsService;
    constructor(maintenanceModel: Model<MaintenanceDocument>, driversService: DriversService, vehiclesService: VehiclesService, rentalsService: RentalsService);
    getDashboardKpis(): Promise<any>;
    getMonthlyRevenue(months?: number): Promise<any[]>;
    getFinancialPerVehicle(): Promise<any[]>;
    getMileagePerVehicle(): Promise<any[]>;
}
