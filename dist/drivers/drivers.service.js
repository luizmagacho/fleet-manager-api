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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const driver_schema_1 = require("./schemas/driver.schema");
let DriversService = class DriversService {
    constructor(driverModel) {
        this.driverModel = driverModel;
    }
    async create(createDriverDto) {
        const existing = await this.driverModel.findOne({
            $or: [
                { cpf: createDriverDto.cpf },
                { licenseNumber: createDriverDto.licenseNumber },
            ],
        });
        if (existing) {
            throw new common_1.ConflictException('Já existe um motorista com este CPF ou CNH cadastrado.');
        }
        const driver = new this.driverModel(createDriverDto);
        return driver.save();
    }
    async findAll(page = 1, limit = 10, search, status) {
        const filter = {};
        if (status)
            filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { cpf: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { licenseNumber: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.driverModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            this.driverModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findById(id) {
        const driver = await this.driverModel.findById(id);
        if (!driver) {
            throw new common_1.NotFoundException(`Motorista com ID ${id} não encontrado.`);
        }
        return driver;
    }
    async update(id, updateDriverDto) {
        const driver = await this.driverModel.findByIdAndUpdate(id, { $set: updateDriverDto }, { new: true, runValidators: true });
        if (!driver) {
            throw new common_1.NotFoundException(`Motorista com ID ${id} não encontrado.`);
        }
        return driver;
    }
    async updatePhoto(id, photoPath) {
        return this.update(id, { profilePhoto: photoPath });
    }
    async remove(id) {
        const result = await this.driverModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Motorista com ID ${id} não encontrado.`);
        }
    }
    async findWithExpiringLicense(daysAhead = 30) {
        const limit = new Date();
        limit.setDate(limit.getDate() + daysAhead);
        return this.driverModel.find({
            licenseExpiration: { $lte: limit, $gte: new Date() },
            status: driver_schema_1.DriverStatus.ACTIVE,
        });
    }
    async countByStatus() {
        const result = await this.driverModel.aggregate([
            { $group: { _id: '$status', total: { $sum: 1 } } },
        ]);
        return result.reduce((acc, item) => {
            acc[item._id] = item.total;
            return acc;
        }, {});
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(driver_schema_1.Driver.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DriversService);
//# sourceMappingURL=drivers.service.js.map