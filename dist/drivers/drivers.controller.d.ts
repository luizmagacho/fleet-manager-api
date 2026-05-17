import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverStatus } from './schemas/driver.schema';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
    create(createDriverDto: CreateDriverDto): Promise<import("./schemas/driver.schema").Driver>;
    findAll(page: number, limit: number, search?: string, status?: DriverStatus): Promise<{
        data: import("./schemas/driver.schema").Driver[];
        total: number;
        page: number;
        limit: number;
    }>;
    findExpiringLicenses(days: number): Promise<import("./schemas/driver.schema").Driver[]>;
    countByStatus(): Promise<Record<string, number>>;
    findOne(id: string): Promise<import("./schemas/driver.schema").Driver>;
    update(id: string, updateDriverDto: UpdateDriverDto): Promise<import("./schemas/driver.schema").Driver>;
    uploadPhoto(id: string, file: Express.Multer.File): Promise<import("./schemas/driver.schema").Driver>;
    remove(id: string): Promise<void>;
}
