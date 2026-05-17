import { DriversService } from '../drivers/drivers.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { RentalsService } from '../rentals/rentals.service';
import { EmailService } from './email/email.service';
import { WhatsAppService } from './whatsapp/whatsapp.service';
export declare class NotificationsService {
    private driversService;
    private vehiclesService;
    private rentalsService;
    private emailService;
    private whatsAppService;
    private readonly logger;
    constructor(driversService: DriversService, vehiclesService: VehiclesService, rentalsService: RentalsService, emailService: EmailService, whatsAppService: WhatsAppService);
    checkExpiringLicenses(): Promise<void>;
    checkExpiringDocuments(): Promise<void>;
    checkOverduePayments(): Promise<void>;
    sendTestNotification(email: string, phone?: string): Promise<void>;
    getInAppNotifications(): Promise<any[]>;
}
