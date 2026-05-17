import { ConfigService } from '@nestjs/config';
export interface DetranFine {
    id: string;
    date: string;
    description: string;
    amount: number;
    points: number;
    status: 'PENDING' | 'PAID' | 'APPEALED';
    location: string;
    agent: string;
}
export interface DetranIpva {
    year: number;
    totalAmount: number;
    paidInstallments: number;
    totalInstallments: number;
    status: 'PAID' | 'PENDING' | 'PARTIAL' | 'OVERDUE';
    dueDate: string;
}
export interface DetranLicensing {
    year: number;
    status: 'VALID' | 'PENDING' | 'EXPIRED';
    expirationDate: string;
    restrictions: string[];
}
export interface DetranVehicleInfo {
    licensePlate: string;
    renavam: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    fines: DetranFine[];
    ipva: DetranIpva;
    licensing: DetranLicensing;
    queriedAt: Date;
}
export declare class DetranService {
    private configService;
    private readonly logger;
    private token;
    private tokenExpiresAt;
    private readonly DETRAN_API_URL;
    private readonly AUTH_URL;
    constructor(configService: ConfigService);
    private getAuthToken;
    private requestApi;
    queryVehicle(licensePlate: string, renavam: string): Promise<DetranVehicleInfo>;
    queryFines(licensePlate: string): Promise<DetranFine[]>;
    queryIpva(renavam: string): Promise<DetranIpva>;
    queryLicensing(renavam: string): Promise<DetranLicensing>;
    private mockVehicleQuery;
}
