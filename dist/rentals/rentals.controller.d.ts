import { RentalsService } from './rentals.service';
import { CreateRentalDto, RecordPaymentDto, UpdateRentalDto } from './dto/create-rental.dto';
import { RentalStatus } from './schemas/rental.schema';
export declare class RentalsController {
    private readonly rentalsService;
    constructor(rentalsService: RentalsService);
    create(createRentalDto: CreateRentalDto): Promise<import("./schemas/rental.schema").Rental>;
    findAll(page: number, limit: number, status?: RentalStatus): Promise<{
        data: import("./schemas/rental.schema").Rental[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOverdue(): Promise<import("./schemas/rental.schema").Rental[]>;
    getFinancialSummary(): Promise<any>;
    getPendingPayments(): Promise<any[]>;
    findByDriver(driverId: string): Promise<import("./schemas/rental.schema").Rental[]>;
    findByVehicle(vehicleId: string): Promise<import("./schemas/rental.schema").Rental[]>;
    findOne(id: string): Promise<import("./schemas/rental.schema").Rental>;
    update(id: string, updateRentalDto: UpdateRentalDto): Promise<import("./schemas/rental.schema").Rental>;
    recordPayment(id: string, recordPaymentDto: RecordPaymentDto): Promise<import("./schemas/rental.schema").Rental>;
    terminate(id: string): Promise<import("./schemas/rental.schema").Rental>;
}
