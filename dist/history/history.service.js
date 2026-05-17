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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const history_event_schema_1 = require("./schemas/history-event.schema");
let HistoryService = class HistoryService {
    constructor(historyEventModel) {
        this.historyEventModel = historyEventModel;
    }
    async record(dto) {
        const event = new this.historyEventModel({
            ...dto,
            vehicleId: new mongoose_2.Types.ObjectId(dto.vehicleId),
            driverId: dto.driverId ? new mongoose_2.Types.ObjectId(dto.driverId) : null,
        });
        return event.save();
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.historyEventModel
                .find()
                .populate('vehicleId', 'licensePlate brand model')
                .populate('driverId', 'name phone cpf')
                .skip(skip)
                .limit(limit)
                .sort({ occurredAt: -1 }),
            this.historyEventModel.countDocuments(),
        ]);
        return { data, total, page, limit };
    }
    async findByVehicle(vehicleId, page = 1, limit = 20, type) {
        const filter = { vehicleId: new mongoose_2.Types.ObjectId(vehicleId) };
        if (type)
            filter.type = type;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.historyEventModel
                .find(filter)
                .populate('driverId', 'name phone cpf')
                .skip(skip)
                .limit(limit)
                .sort({ occurredAt: -1 }),
            this.historyEventModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findByDriver(driverId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const filter = { driverId: new mongoose_2.Types.ObjectId(driverId) };
        const [data, total] = await Promise.all([
            this.historyEventModel
                .find(filter)
                .populate('vehicleId', 'licensePlate brand model')
                .skip(skip)
                .limit(limit)
                .sort({ occurredAt: -1 }),
            this.historyEventModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(history_event_schema_1.HistoryEvent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HistoryService);
//# sourceMappingURL=history.service.js.map