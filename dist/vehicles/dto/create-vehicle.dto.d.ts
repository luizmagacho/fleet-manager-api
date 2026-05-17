import { FuelType, TransmissionType } from '../schemas/vehicle.schema';
export declare class CreateVehicleDto {
    licensePlate: string;
    brand: string;
    model: string;
    year: number;
    modelYear: number;
    color?: string;
    renavam: string;
    chassis: string;
    fuelType?: FuelType;
    transmission?: TransmissionType;
    mileage?: number;
    ipvaDueDate?: Date;
    licensingDueDate?: Date;
    insuranceExpiration?: Date;
    purchaseValue?: number;
    notes?: string;
}
