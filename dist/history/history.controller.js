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
exports.HistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const history_service_1 = require("./history.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const history_event_schema_1 = require("./schemas/history-event.schema");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    findAll(page, limit) {
        return this.historyService.findAll(page, limit);
    }
    findByVehicle(vehicleId, page, limit, type) {
        return this.historyService.findByVehicle(vehicleId, page, limit, type);
    }
    findByDriver(driverId, page, limit) {
        return this.historyService.findByDriver(driverId, page, limit);
    }
};
exports.HistoryController = HistoryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Histórico global do sistema' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('vehicle/:vehicleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Histórico completo de um veículo' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: history_event_schema_1.EventType }),
    __param(0, (0, common_1.Param)('vehicleId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "findByVehicle", null);
__decorate([
    (0, common_1.Get)('driver/:driverId'),
    (0, swagger_1.ApiOperation)({ summary: 'Histórico de um motorista' }),
    __param(0, (0, common_1.Param)('driverId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "findByDriver", null);
exports.HistoryController = HistoryController = __decorate([
    (0, swagger_1.ApiTags)('Histórico'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('history'),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
//# sourceMappingURL=history.controller.js.map