import { Model, Types } from 'mongoose';
import { Maintenance, MaintenanceDocument, MaintenanceStatus } from './schemas/maintenance.schema';
import { VehiclesService } from '../vehicles/vehicles.service';
import { HistoryService } from '../history/history.service';
export declare class CreateMaintenanceDto {
    vehicleId: string;
    type: string;
    scheduledDate: Date;
    description: string;
    workshopName?: string;
    workshopPhone?: string;
    services?: string[];
    cost?: number;
    mileageAtService?: number;
    nextServiceMileage?: number;
    nextServiceDate?: Date;
    notes?: string;
}
export declare class MaintenancesService {
    private maintenanceModel;
    private vehiclesService;
    private historyService;
    constructor(maintenanceModel: Model<MaintenanceDocument>, vehiclesService: VehiclesService, historyService: HistoryService);
    create(dto: CreateMaintenanceDto): Promise<Maintenance>;
    findAll(page?: number, limit?: number, vehicleId?: string, status?: MaintenanceStatus): Promise<{
        data: (import("mongoose").Document<unknown, {}, MaintenanceDocument, {}, import("mongoose").DefaultSchemaOptions> & Maintenance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Maintenance>;
    complete(id: string, cost: number, notes?: string): Promise<Maintenance>;
    findUpcoming(daysAhead?: number): Promise<Maintenance[]>;
    getTotalCostByVehicle(): Promise<any[]>;
}
