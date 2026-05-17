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
exports.MaintenancesService = exports.CreateMaintenanceDto = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const maintenance_schema_1 = require("./schemas/maintenance.schema");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const history_service_1 = require("../history/history.service");
const history_event_schema_1 = require("../history/schemas/history-event.schema");
class CreateMaintenanceDto {
}
exports.CreateMaintenanceDto = CreateMaintenanceDto;
let MaintenancesService = class MaintenancesService {
    constructor(maintenanceModel, vehiclesService, historyService) {
        this.maintenanceModel = maintenanceModel;
        this.vehiclesService = vehiclesService;
        this.historyService = historyService;
    }
    async create(dto) {
        const maintenance = new this.maintenanceModel({
            ...dto,
            vehicleId: new mongoose_2.Types.ObjectId(dto.vehicleId),
        });
        const saved = await maintenance.save();
        await this.historyService.record({
            vehicleId: dto.vehicleId,
            type: history_event_schema_1.EventType.MAINTENANCE_SCHEDULED,
            title: 'Manutenção agendada',
            description: `${dto.description} - ${dto.workshopName ?? 'Oficina não informada'}`,
            metadata: { maintenanceId: saved._id, type: dto.type, cost: dto.cost },
        });
        return saved;
    }
    async findAll(page = 1, limit = 10, vehicleId, status) {
        const filter = {};
        if (status)
            filter.status = status;
        if (vehicleId)
            filter.vehicleId = new mongoose_2.Types.ObjectId(vehicleId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.maintenanceModel
                .find(filter)
                .populate('vehicleId', 'licensePlate brand model color')
                .skip(skip)
                .limit(limit)
                .sort({ scheduledDate: -1 }),
            this.maintenanceModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findById(id) {
        const maintenance = await this.maintenanceModel
            .findById(id)
            .populate('vehicleId', 'licensePlate brand model color year');
        if (!maintenance)
            throw new Error(`Manutenção ${id} não encontrada.`);
        return maintenance;
    }
    async complete(id, cost, notes) {
        const maintenance = await this.maintenanceModel.findByIdAndUpdate(id, {
            $set: {
                status: maintenance_schema_1.MaintenanceStatus.COMPLETED,
                completedDate: new Date(),
                cost,
                notes,
            },
        }, { new: true });
        if (!maintenance)
            throw new Error(`Manutenção ${id} não encontrada.`);
        await this.historyService.record({
            vehicleId: maintenance.vehicleId.toString(),
            type: history_event_schema_1.EventType.MAINTENANCE_COMPLETED,
            title: 'Manutenção concluída',
            description: maintenance.description,
            metadata: { maintenanceId: id, cost },
        });
        if (maintenance.nextServiceDate) {
            await this.vehiclesService.update(maintenance.vehicleId.toString(), {
                nextMaintenanceDate: maintenance.nextServiceDate,
                nextMaintenanceMileage: maintenance.nextServiceMileage,
            });
        }
        return maintenance;
    }
    async findUpcoming(daysAhead = 7) {
        const limit = new Date();
        limit.setDate(limit.getDate() + daysAhead);
        return this.maintenanceModel
            .find({
            status: maintenance_schema_1.MaintenanceStatus.SCHEDULED,
            scheduledDate: { $lte: limit, $gte: new Date() },
        })
            .populate('vehicleId', 'licensePlate brand model');
    }
    async getTotalCostByVehicle() {
        return this.maintenanceModel.aggregate([
            { $match: { status: maintenance_schema_1.MaintenanceStatus.COMPLETED } },
            {
                $group: {
                    _id: '$vehicleId',
                    totalCost: { $sum: '$cost' },
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'vehicles',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'vehicle',
                },
            },
            { $unwind: '$vehicle' },
            {
                $project: {
                    'vehicle.licensePlate': 1,
                    'vehicle.brand': 1,
                    'vehicle.model': 1,
                    totalCost: 1,
                    count: 1,
                },
            },
            { $sort: { totalCost: -1 } },
        ]);
    }
};
exports.MaintenancesService = MaintenancesService;
exports.MaintenancesService = MaintenancesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(maintenance_schema_1.Maintenance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        vehicles_service_1.VehiclesService,
        history_service_1.HistoryService])
], MaintenancesService);
//# sourceMappingURL=maintenances.service.js.map