import { Model } from 'mongoose';
import { Vehicle, VehicleDocument, VehicleStatus } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
export declare class VehiclesService {
    private vehicleModel;
    constructor(vehicleModel: Model<VehicleDocument>);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(page?: number, limit?: number, search?: string, status?: VehicleStatus): Promise<{
        data: Vehicle[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Vehicle>;
    findByLicensePlate(plate: string): Promise<Vehicle>;
    update(id: string, updateData: Partial<CreateVehicleDto>): Promise<Vehicle>;
    updateStatus(id: string, status: VehicleStatus, driverId?: string): Promise<Vehicle>;
    addPhoto(id: string, photoPath: string): Promise<Vehicle>;
    remove(id: string): Promise<void>;
    findWithExpiringDocuments(daysAhead?: number): Promise<Vehicle[]>;
    countByStatus(): Promise<Record<string, number>>;
}
