import { PaymentFrequency } from '../schemas/rental.schema';
export declare class CreateRentalDto {
    vehicleId: string;
    driverId: string;
    startDate: Date;
    expectedEndDate?: Date;
    rentalAmount: number;
    paymentFrequency: PaymentFrequency;
    securityDeposit?: number;
    notes?: string;
}
export declare class RecordPaymentDto {
    paymentId: string;
    paidAt: Date;
    paymentMethod?: string;
    notes?: string;
}
declare const UpdateRentalDto_base: import("@nestjs/common").Type<Partial<CreateRentalDto>>;
export declare class UpdateRentalDto extends UpdateRentalDto_base {
    status?: string;
}
export {};
