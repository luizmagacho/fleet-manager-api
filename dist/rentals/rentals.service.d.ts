import { Model } from 'mongoose';
import { Rental, RentalDocument, RentalStatus } from './schemas/rental.schema';
import { CreateRentalDto, RecordPaymentDto } from './dto/create-rental.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
export declare class RentalsService {
    private rentalModel;
    private vehiclesService;
    constructor(rentalModel: Model<RentalDocument>, vehiclesService: VehiclesService);
    private generatePaymentSchedule;
    create(createRentalDto: CreateRentalDto): Promise<Rental>;
    update(id: string, updateData: any): Promise<Rental>;
    findAll(page?: number, limit?: number, status?: RentalStatus): Promise<{
        data: Rental[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<Rental>;
    findByDriver(driverId: string): Promise<Rental[]>;
    findByVehicle(vehicleId: string): Promise<Rental[]>;
    recordPayment(rentalId: string, recordPaymentDto: RecordPaymentDto): Promise<Rental>;
    terminate(id: string): Promise<Rental>;
    findOverduePayments(): Promise<Rental[]>;
    getPendingPayments(): Promise<any[]>;
    checkOverduePayments(): Promise<void>;
    getFinancialSummary(): Promise<any>;
}
