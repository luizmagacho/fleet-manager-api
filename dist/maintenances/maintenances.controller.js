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
exports.MaintenancesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const maintenances_service_1 = require("./maintenances.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const maintenance_schema_1 = require("./schemas/maintenance.schema");
const class_validator_1 = require("class-validator");
class CompleteMaintenanceDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CompleteMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteMaintenanceDto.prototype, "notes", void 0);
let MaintenancesController = class MaintenancesController {
    constructor(maintenancesService) {
        this.maintenancesService = maintenancesService;
    }
    create(dto) {
        return this.maintenancesService.create(dto);
    }
    findAll(page, limit, vehicleId, status) {
        return this.maintenancesService.findAll(page, limit, vehicleId, status);
    }
    findUpcoming(days) {
        return this.maintenancesService.findUpcoming(days);
    }
    getCostByVehicle() {
        return this.maintenancesService.getTotalCostByVehicle();
    }
    findOne(id) {
        return this.maintenancesService.findById(id);
    }
    complete(id, dto) {
        return this.maintenancesService.complete(id, dto.cost, dto.notes);
    }
};
exports.MaintenancesController = MaintenancesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nova manutenção' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [maintenances_service_1.CreateMaintenanceDto]),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar manutenções' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'vehicleId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: maintenance_schema_1.MaintenanceStatus }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('vehicleId')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Manutenções agendadas nos próximos dias' }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(7), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "findUpcoming", null);
__decorate([
    (0, common_1.Get)('cost-by-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: 'Custo total de manutenção por veículo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "getCostByVehicle", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar manutenção como concluída' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CompleteMaintenanceDto]),
    __metadata("design:returntype", void 0)
], MaintenancesController.prototype, "complete", null);
exports.MaintenancesController = MaintenancesController = __decorate([
    (0, swagger_1.ApiTags)('Manutenções'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('maintenances'),
    __metadata("design:paramtypes", [maintenances_service_1.MaintenancesService])
], MaintenancesController);
//# sourceMappingURL=maintenances.controller.js.map