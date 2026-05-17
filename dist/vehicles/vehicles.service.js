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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vehicle_schema_1 = require("./schemas/vehicle.schema");
let VehiclesService = class VehiclesService {
    constructor(vehicleModel) {
        this.vehicleModel = vehicleModel;
    }
    async create(createVehicleDto) {
        const vehicle = new this.vehicleModel(createVehicleDto);
        return vehicle.save();
    }
    async findAll(page = 1, limit = 10, search, status) {
        const filter = {};
        if (status)
            filter.status = status;
        if (search) {
            filter.$or = [
                { licensePlate: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } },
                { renavam: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.vehicleModel
                .find(filter)
                .populate('currentDriverId', 'name phone email cpf')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.vehicleModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findById(id) {
        const vehicle = await this.vehicleModel
            .findById(id)
            .populate('currentDriverId', 'name phone email cpf');
        if (!vehicle) {
            throw new common_1.NotFoundException(`Veículo com ID ${id} não encontrado.`);
        }
        return vehicle;
    }
    async findByLicensePlate(plate) {
        const vehicle = await this.vehicleModel.findOne({
            licensePlate: plate.toUpperCase(),
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Veículo com placa ${plate} não encontrado.`);
        }
        return vehicle;
    }
    async update(id, updateData) {
        const vehicle = await this.vehicleModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Veículo com ID ${id} não encontrado.`);
        }
        return vehicle;
    }
    async updateStatus(id, status, driverId) {
        const updateData = { status };
        if (status === vehicle_schema_1.VehicleStatus.RENTED && driverId) {
            updateData.currentDriverId = new mongoose_2.Types.ObjectId(driverId);
        }
        else if (status !== vehicle_schema_1.VehicleStatus.RENTED) {
            updateData.currentDriverId = null;
        }
        return this.update(id, updateData);
    }
    async addPhoto(id, photoPath) {
        const vehicle = await this.vehicleModel.findByIdAndUpdate(id, { $push: { photos: photoPath } }, { new: true });
        if (!vehicle)
            throw new common_1.NotFoundException(`Veículo com ID ${id} não encontrado.`);
        return vehicle;
    }
    async remove(id) {
        const result = await this.vehicleModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Veículo com ID ${id} não encontrado.`);
        }
    }
    async findWithExpiringDocuments(daysAhead = 30) {
        const limit = new Date();
        limit.setDate(limit.getDate() + daysAhead);
        const now = new Date();
        return this.vehicleModel.find({
            $or: [
                { ipvaDueDate: { $lte: limit, $gte: now } },
                { licensingDueDate: { $lte: limit, $gte: now } },
                { insuranceExpiration: { $lte: limit, $gte: now } },
            ],
        });
    }
    async countByStatus() {
        const result = await this.vehicleModel.aggregate([
            { $group: { _id: '$status', total: { $sum: 1 } } },
        ]);
        return result.reduce((acc, item) => {
            acc[item._id] = item.total;
            return acc;
        }, {});
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vehicle_schema_1.Vehicle.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map