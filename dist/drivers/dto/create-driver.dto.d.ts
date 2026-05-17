import { LicenseCategory } from '../schemas/driver.schema';
export declare class CreateDriverDto {
    name: string;
    cpf: string;
    licenseNumber: string;
    licenseCategory: LicenseCategory;
    licenseExpiration: Date;
    phone: string;
    email: string;
    address?: string;
    city?: string;
    zipCode?: string;
    platforms?: string[];
    notes?: string;
}
