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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const maintenance_schema_1 = require("../maintenances/schemas/maintenance.schema");
const drivers_service_1 = require("../drivers/drivers.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const rentals_service_1 = require("../rentals/rentals.service");
let ReportsService = class ReportsService {
    constructor(maintenanceModel, driversService, vehiclesService, rentalsService) {
        this.maintenanceModel = maintenanceModel;
        this.driversService = driversService;
        this.vehiclesService = vehiclesService;
        this.rentalsService = rentalsService;
    }
    async getDashboardKpis() {
        const [vehicleStats, driverStats, financialSummary,] = await Promise.all([
            this.vehiclesService.countByStatus(),
            this.driversService.countByStatus(),
            this.rentalsService.getFinancialSummary(),
        ]);
        const maintenancePending = await this.maintenanceModel.countDocuments({
            status: maintenance_schema_1.MaintenanceStatus.SCHEDULED,
        });
        return {
            vehicles: {
                total: Object.values(vehicleStats).reduce((a, b) => a + b, 0),
                available: vehicleStats['AVAILABLE'] ?? 0,
                rented: vehicleStats['RENTED'] ?? 0,
                maintenance: vehicleStats['MAINTENANCE'] ?? 0,
                inactive: vehicleStats['INACTIVE'] ?? 0,
            },
            drivers: {
                total: Object.values(driverStats).reduce((a, b) => a + b, 0),
                active: driverStats['ACTIVE'] ?? 0,
                inactive: driverStats['INACTIVE'] ?? 0,
                suspended: driverStats['SUSPENDED'] ?? 0,
            },
            financial: financialSummary,
            maintenancePending,
        };
    }
    async getMonthlyRevenue(months = 6) {
        const result = await this.rentalsService['rentalModel']?.aggregate?.([
            { $unwind: '$payments' },
            { $match: { 'payments.status': 'PAID' } },
            {
                $group: {
                    _id: {
                        year: { $year: '$payments.paidAt' },
                        month: { $month: '$payments.paidAt' },
                    },
                    total: { $sum: '$payments.amount' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
            { $limit: months },
        ]) ?? [];
        return result;
    }
    async getFinancialPerVehicle() {
        const vehicles = await this.vehiclesService['vehicleModel'].find().select('_id licensePlate brand model').lean();
        const results = await Promise.all(vehicles.map(async (v) => {
            const rentals = await this.rentalsService['rentalModel'].find({ vehicleId: v._id }).lean();
            const revenue = rentals.reduce((sum, r) => {
                return sum + (r.payments?.filter(p => p.status === 'PAID').reduce((pSum, p) => pSum + p.amount, 0) || 0);
            }, 0);
            const maintenances = await this.maintenanceModel.find({ vehicleId: v._id }).lean();
            const maintenanceCost = maintenances.reduce((sum, m) => sum + (m.cost || 0), 0);
            return {
                vehicleId: v._id,
                licensePlate: v.licensePlate,
                name: `${v.brand} ${v.model}`,
                revenue,
                maintenanceCost,
                finesCost: 0,
                profit: revenue - maintenanceCost
            };
        }));
        return results.sort((a, b) => b.profit - a.profit);
    }
    async getMileagePerVehicle() {
        const vehicles = await this.vehiclesService['vehicleModel'].find().select('_id licensePlate brand model mileage').lean();
        return vehicles.map(v => ({
            vehicleId: v._id,
            licensePlate: v.licensePlate,
            name: `${v.brand} ${v.model}`,
            mileage: v.mileage || 0
        })).sort((a, b) => b.mileage - a.mileage);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(maintenance_schema_1.Maintenance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        drivers_service_1.DriversService,
        vehicles_service_1.VehiclesService,
        rentals_service_1.RentalsService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map