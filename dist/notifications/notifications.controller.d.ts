import { NotificationsService } from './notifications.service';
declare class TestNotificationDto {
    email: string;
    phone?: string;
}
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    sendTest(dto: TestNotificationDto): Promise<void>;
    getInAppNotifications(): Promise<any[]>;
}
export {};
