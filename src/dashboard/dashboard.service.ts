import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument, VehicleStatus } from '../vehicles/schemas/vehicle.schema';
import { Driver, DriverDocument, DriverStatus } from '../drivers/schemas/driver.schema';
import { Rental, RentalDocument, RentalStatus } from '../rentals/schemas/rental.schema';
import { Maintenance, MaintenanceDocument, MaintenanceStatus } from '../maintenances/schemas/maintenance.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    @InjectModel(Rental.name) private rentalModel: Model<RentalDocument>,
    @InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>,
  ) {}

  async getKpis() {
    const [vehiclesCount, rentedVehicles, availableVehicles, maintenanceVehicles, inactiveVehicles] = await Promise.all([
      this.vehicleModel.countDocuments(),
      this.vehicleModel.countDocuments({ status: VehicleStatus.RENTED }),
      this.vehicleModel.countDocuments({ status: VehicleStatus.AVAILABLE }),
      this.vehicleModel.countDocuments({ status: VehicleStatus.MAINTENANCE }),
      this.vehicleModel.countDocuments({ status: VehicleStatus.INACTIVE }),
    ]);

    const activeRentals = await this.rentalModel.countDocuments({ status: RentalStatus.ACTIVE });

    return {
      vehicles: {
        total: vehiclesCount,
        byStatus: {
          AVAILABLE: availableVehicles,
          RENTED: rentedVehicles,
          MAINTENANCE: maintenanceVehicles,
          INACTIVE: inactiveVehicles,
        }
      },
      rentals: {
        active: activeRentals,
        idleVehicles: availableVehicles,
      },
      fines: {
        count: 0,
        total: 0
      },
      alerts: {
        ipva: 0,
        licensing: 0,
        maintenance: 0,
        cnh: 0
      }
    };
  }

  async getCharts(months: number) {
    const result = await this.rentalModel.aggregate([
      { $unwind: '$payments' },
      { $match: { 'payments.status': 'PAID' } },
      {
        $group: {
          _id: {
            year: { $year: '$payments.paidAt' },
            month: { $month: '$payments.paidAt' },
          },
          total: { $sum: '$payments.amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: Number(months) },
    ]);

    return {
      revenue: result.map(item => ({
        _id: `${String(item._id.month).padStart(2, '0')}/${item._id.year}`,
        total: item.total
      }))
    };
  }

  async getAlerts() {
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const expiringDrivers = await this.driverModel.find({
      licenseExpiration: { $gte: now, $lte: nextMonth },
      status: DriverStatus.ACTIVE
    });

    const scheduledMaintenances = await this.maintenanceModel.find({
      status: MaintenanceStatus.SCHEDULED,
      scheduledDate: { $gte: now, $lte: nextMonth }
    }).populate('vehicleId', 'licensePlate plate');

    return {
      ipva: [],
      licensing: [],
      maintenance: scheduledMaintenances,
      cnh: expiringDrivers
    };
  }
}
