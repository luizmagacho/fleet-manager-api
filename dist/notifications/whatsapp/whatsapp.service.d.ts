import { ConfigService } from '@nestjs/config';
export interface WhatsAppPayload {
    to: string;
    message: string;
}
export declare class WhatsAppService {
    private configService;
    private readonly logger;
    private client;
    private readonly fromNumber;
    constructor(configService: ConfigService);
    send(payload: WhatsAppPayload): Promise<void>;
    sendPaymentOverdueAlert(driverName: string, phone: string, plate: string, amount: number): Promise<void>;
    sendLicenseExpirationWarning(driverName: string, phone: string, daysLeft: number): Promise<void>;
    sendDocumentExpirationAlert(phone: string, plate: string, documentType: string, daysLeft: number): Promise<void>;
    sendFineAlert(phone: string, plate: string, description: string, amount: number): Promise<void>;
}
