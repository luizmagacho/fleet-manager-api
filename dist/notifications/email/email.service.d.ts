import { ConfigService } from '@nestjs/config';
export interface EmailPayload {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
}
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    send(payload: EmailPayload): Promise<void>;
    sendPaymentOverdue(driverName: string, driverEmail: string, plate: string, amount: number, daysOverdue: number): Promise<void>;
    sendLicenseExpirationWarning(driverName: string, driverEmail: string, daysLeft: number): Promise<void>;
    sendDocumentExpirationAlert(email: string, plate: string, documentType: string, daysLeft: number): Promise<void>;
}
