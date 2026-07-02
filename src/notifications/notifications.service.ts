import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DriversService } from '../drivers/drivers.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { RentalsService } from '../rentals/rentals.service';
import { EmailService } from './email/email.service';
import { WhatsAppService } from './whatsapp/whatsapp.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private driversService: DriversService,
    private vehiclesService: VehiclesService,
    private rentalsService: RentalsService,
    private emailService: EmailService,
    private whatsAppService: WhatsAppService,
  ) {}

  /** Runs every day at 8am — check expiring driver licenses (30 days ahead) */
  @Cron('0 8 * * *')
  async checkExpiringLicenses(): Promise<void> {
    this.logger.log('Verificando CNHs próximas ao vencimento...');

    const drivers = await this.driversService.findWithExpiringLicense(30);

    for (const driver of drivers) {
      const daysLeft = Math.ceil(
        (new Date(driver.licenseExpiration).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      );

      const driverDoc = driver as any;
      await Promise.allSettled([
        this.emailService.sendLicenseExpirationWarning(driver.name, driver.email, daysLeft),
        this.whatsAppService.sendLicenseExpirationWarning(driver.name, driver.phone, daysLeft),
      ]);
    }

    this.logger.log(`CNHs verificadas: ${drivers.length} alertas enviados.`);
  }

  /** Runs every day at 8:30am — check vehicles with expiring documents */
  @Cron('30 8 * * *')
  async checkExpiringDocuments(): Promise<void> {
    this.logger.log('Verificando documentos de veículos próximos ao vencimento...');

    const vehicles = await this.vehiclesService.findWithExpiringDocuments(30);
    const adminEmail = process.env.ADMIN_EMAIL ?? '';

    for (const vehicle of vehicles) {
      const vDoc = vehicle as any;
      const now = Date.now();

      const checks = [
        { date: vDoc.ipvaDueDate, type: 'ipva' },
        { date: vDoc.licensingDueDate, type: 'licensing' },
        { date: vDoc.insuranceExpiration, type: 'insurance' },
      ];

      for (const check of checks) {
        if (check.date) {
          const daysLeft = Math.ceil(
            (new Date(check.date).getTime() - now) / (1000 * 60 * 60 * 24),
          );
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

  /** Runs every day at 9am — check overdue rental payments */
  @Cron('0 9 * * *')
  async checkOverduePayments(): Promise<void> {
    this.logger.log('Verificando pagamentos de aluguel atrasados...');

    const overdueRentals = await this.rentalsService.findOverduePayments();

    for (const rental of overdueRentals) {
      const rentalDoc = rental as any;
      const driver = rentalDoc.driverId;
      const vehicle = rentalDoc.vehicleId;

      const overduePayments = rentalDoc.payments.filter(
        (p: any) => p.status === 'PENDING' && new Date(p.dueDate) < new Date(),
      );

      if (!overduePayments.length) continue;

      const totalOverdue = overduePayments.reduce((sum: number, p: any) => sum + p.amount, 0);
      const daysOverdue = Math.ceil(
        (Date.now() - new Date(overduePayments[0].dueDate).getTime()) / (1000 * 60 * 60 * 24),
      );

      await Promise.allSettled([
        this.emailService.sendPaymentOverdue(driver.name, driver.email, vehicle.licensePlate, totalOverdue, daysOverdue),
        this.whatsAppService.sendPaymentOverdueAlert(driver.name, driver.phone, vehicle.licensePlate, totalOverdue),
      ]);
    }

    this.logger.log(`Pagamentos verificados: ${overdueRentals.length} aluguéis com atraso.`);
  }

  /** Runs every day at 8:15am — check payments due in 2 days */
  @Cron('15 8 * * *')
  async checkUpcomingPayments(): Promise<void> {
    this.logger.log('Verificando pagamentos próximos ao vencimento...');

    const upcomingRentals = await this.rentalsService.findUpcomingPayments(2);

    for (const rental of upcomingRentals) {
      const rentalDoc = rental as any;
      const driver = rentalDoc.driverId;
      const vehicle = rentalDoc.vehicleId;

      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)).getTime();
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)).getTime();

      const upcomingPayments = rentalDoc.payments.filter(
        (p: any) => p.status === 'PENDING' && new Date(p.dueDate).getTime() >= startOfDay && new Date(p.dueDate).getTime() <= endOfDay,
      );

      for (const payment of upcomingPayments) {
        await Promise.allSettled([
          this.emailService.sendPaymentUpcomingWarning(driver.name, driver.email, vehicle.licensePlate, payment.amount, payment.dueDate),
          this.whatsAppService.sendPaymentUpcomingWarning(driver.name, driver.phone, vehicle.licensePlate, payment.amount, payment.dueDate),
        ]);
      }
    }

    this.logger.log(`Pagamentos próximos verificados: ${upcomingRentals.length} alertas enviados.`);
  }

  /** Runs every day at 10:00am — check monthly mileage updates */
  @Cron('0 10 * * *')
  async checkMonthlyMileage(): Promise<void> {
    this.logger.log('Verificando fechamento de ciclo de quilometragem mensal...');

    const monthlyRentals = await this.rentalsService.findRentalsForMonthlyMileage();

    for (const rental of monthlyRentals) {
      const rentalDoc = rental as any;
      const driver = rentalDoc.driverId;
      const vehicle = rentalDoc.vehicleId;

      await Promise.allSettled([
        this.emailService.sendMileageUpdateReminder(driver.name, driver.email, vehicle.licensePlate),
        this.whatsAppService.sendMileageUpdateReminder(driver.name, driver.phone, vehicle.licensePlate),
      ]);
    }

    this.logger.log(`Ciclos mensais verificados: ${monthlyRentals.length} alertas enviados.`);
  }

  /** Manual trigger — send test notification */
  async sendTestNotification(email: string, phone?: string): Promise<void> {
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
  /** Retrieve mock in-app notifications for scaffolding */
  async getInAppNotifications(): Promise<any[]> {
    return [
      { id: '1', title: 'Boas-vindas', message: 'Sistema de notificações In-App configurado.', isRead: false, createdAt: new Date() }
    ];
  }
}
