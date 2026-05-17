import { DetranService } from './detran.service';
export declare class DetranController {
    private readonly detranService;
    constructor(detranService: DetranService);
    queryVehicle(plate: string, renavam: string): Promise<import("./detran.service").DetranVehicleInfo>;
    queryFines(plate: string): Promise<import("./detran.service").DetranFine[]>;
    queryIpva(renavam: string): Promise<import("./detran.service").DetranIpva>;
    queryLicensing(renavam: string): Promise<import("./detran.service").DetranLicensing>;
}
