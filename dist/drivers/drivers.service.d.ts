import { Model } from 'mongoose';
import { Driver, DriverDocument, DriverStatus } from './schemas/driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
export declare class DriversService {
    private driverModel;
    constructor(driverModel: Model<DriverDocument>);
    create(createDriverDto: CreateDriverDto): Promise<Driver>;
    findAll(page?: number, limit?: number, search?: string, status?: DriverStatus): Promise<{
        data: Driver[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Driver>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver>;
    updatePhoto(id: string, photoPath: string): Promise<Driver>;
    remove(id: string): Promise<void>;
    findWithExpiringLicense(daysAhead?: number): Promise<Driver[]>;
    countByStatus(): Promise<Record<string, number>>;
}
