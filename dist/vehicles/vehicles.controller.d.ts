import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from './schemas/vehicle.schema';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<import("./schemas/vehicle.schema").Vehicle>;
    findAll(page: number, limit: number, search?: string, status?: VehicleStatus): Promise<{
        data: import("./schemas/vehicle.schema").Vehicle[];
        total: number;
        page: number;
        limit: number;
    }>;
    findExpiringDocuments(days: number): Promise<import("./schemas/vehicle.schema").Vehicle[]>;
    countByStatus(): Promise<Record<string, number>>;
    findByPlate(plate: string): Promise<import("./schemas/vehicle.schema").Vehicle>;
    findOne(id: string): Promise<import("./schemas/vehicle.schema").Vehicle>;
    update(id: string, updateData: Partial<CreateVehicleDto>): Promise<import("./schemas/vehicle.schema").Vehicle>;
    uploadPhoto(id: string, file: Express.Multer.File): Promise<import("./schemas/vehicle.schema").Vehicle>;
    remove(id: string): Promise<void>;
}
