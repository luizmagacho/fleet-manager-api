"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const drivers_service_1 = require("../drivers/drivers.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const rentals_service_1 = require("../rentals/rentals.service");
const email_service_1 = require("./email/email.service");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(driversService, vehiclesService, rentalsService, emailService, whatsAppService) {
        this.driversService = driversService;
        this.vehiclesService = vehiclesService;
        this.rentalsService = rentalsService;
        this.emailService = emailService;
        this.whatsAppService = whatsAppService;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    async checkExpiringLicenses() {
        this.logger.log('Verificando CNHs próximas ao vencimento...');
        const drivers = await this.driversService.findWithExpiringLicense(30);
        for (const driver of drivers) {
            const daysLeft = Math.ceil((new Date(driver.licenseExpiration).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            const driverDoc = driver;
            await Promise.allSettled([
                this.emailService.sendLicenseExpirationWarning(driver.name, driver.email, daysLeft),
                this.whatsAppService.sendLicenseExpirationWarning(driver.name, driver.phone, daysLeft),
            ]);
        }
        this.logger.log(`CNHs verificadas: ${drivers.length} alertas enviados.`);
    }
    async checkExpiringDocuments() {
        this.logger.log('Verificando documentos de veículos próximos ao vencimento...');
        const vehicles = await this.vehiclesService.findWithExpiringDocuments(30);
        const adminEmail = process.env.ADMIN_EMAIL ?? '';
        for (const vehicle of vehicles) {
            const vDoc = vehicle;
            const now = Date.now();
            const checks = [
                { date: vDoc.ipvaDueDate, type: 'ipva' },
                { date: vDoc.licensingDueDate, type: 'licensing' },
                { date: vDoc.insuranceExpiration, type: 'insurance' },
            ];
            for (const check of checks) {
                if (check.date) {
                    const daysLeft = Math.ceil((new Date(check.date).getTime() - now) / (1000 * 60 * 60 * 24));
                    if (daysLeft <= 30 && daysLeft >= 0) {
                        await Promise.allSettled([
                            this.emailService.sendDocumentExpirationAlert(adminEmail, vehicle.licensePlate, check.type, daysLeft),
                        ]);
                    }
                }
            }
        }
        this.logger.log(`Documentos verificados: ${vehicles.length} veículos.`);
    }
    async checkOverduePayments() {
        this.logger.log('Verificando pagamentos de aluguel atrasados...');
        const overdueRentals = await this.rentalsService.findOverduePayments();
        for (const rental of overdueRentals) {
            const rentalDoc = rental;
            const driver = rentalDoc.driverId;
            const vehicle = rentalDoc.vehicleId;
            const overduePayments = rentalDoc.payments.filter((p) => p.status === 'PENDING' && new Date(p.dueDate) < new Date());
            if (!overduePayments.length)
                continue;
            const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);
            const daysOverdue = Math.ceil((Date.now() - new Date(overduePayments[0].dueDate).getTime()) / (1000 * 60 * 60 * 24));
            await Promise.allSettled([
                this.emailService.sendPaymentOverdue(driver.name, driver.email, vehicle.licensePlate, totalOverdue, daysOverdue),
                this.whatsAppService.sendPaymentOverdueAlert(driver.name, driver.phone, vehicle.licensePlate, totalOverdue),
            ]);
        }
        this.logger.log(`Pagamentos verificados: ${overdueRentals.length} aluguéis com atraso.`);
    }
    async sendTestNotification(email, phone) {
        await this.emailService.send({
            to: email,
            subject: 'Teste de notificação — GestorFrota PR',
            html: '<p>✅ Sistema de notificações configurado com sucesso!</p>',
        });
        if (phone) {
            await this.whatsAppService.send({
                to: phone,
                message: '✅ *GestorFrota PR* — Sistema de notificações WhatsApp configurado com sucesso!',
            });
        }
    }
    async getInAppNotifications() {
        return [
            { id: '1', title: 'Boas-vindas', message: 'Sistema de notificações In-App configurado.', isRead: false, createdAt: new Date() }
        ];
    }
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, schedule_1.Cron)('0 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkExpiringLicenses", null);
__decorate([
    (0, schedule_1.Cron)('30 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkExpiringDocuments", null);
__decorate([
    (0, schedule_1.Cron)('0 9 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkOverduePayments", null);
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drivers_service_1.DriversService,
        vehicles_service_1.VehiclesService,
        rentals_service_1.RentalsService,
        email_service_1.EmailService,
        whatsapp_service_1.WhatsAppService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map