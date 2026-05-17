import { MaintenancesService, CreateMaintenanceDto } from './maintenances.service';
import { MaintenanceStatus } from './schemas/maintenance.schema';
declare class CompleteMaintenanceDto {
    cost: number;
    notes?: string;
}
export declare class MaintenancesController {
    private readonly maintenancesService;
    constructor(maintenancesService: MaintenancesService);
    create(dto: CreateMaintenanceDto): Promise<import("./schemas/maintenance.schema").Maintenance>;
    findAll(page: number, limit: number, vehicleId?: string, status?: MaintenanceStatus): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/maintenance.schema").MaintenanceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/maintenance.schema").Maintenance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findUpcoming(days: number): Promise<import("./schemas/maintenance.schema").Maintenance[]>;
    getCostByVehicle(): Promise<any[]>;
    findOne(id: string): Promise<import("./schemas/maintenance.schema").Maintenance>;
    complete(id: string, dto: CompleteMaintenanceDto): Promise<import("./schemas/maintenance.schema").Maintenance>;
}
export {};
