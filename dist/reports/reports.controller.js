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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getDashboardKpis() {
        return this.reportsService.getDashboardKpis();
    }
    getMonthlyRevenue(months) {
        return this.reportsService.getMonthlyRevenue(months);
    }
    getFinancialPerVehicle() {
        return this.reportsService.getFinancialPerVehicle();
    }
    getMileagePerVehicle() {
        return this.reportsService.getMileagePerVehicle();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'KPIs do dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getDashboardKpis", null);
__decorate([
    (0, common_1.Get)('monthly-revenue'),
    (0, swagger_1.ApiOperation)({ summary: 'Receita mensal' }),
    __param(0, (0, common_1.Query)('months', new common_1.DefaultValuePipe(6), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getMonthlyRevenue", null);
__decorate([
    (0, common_1.Get)('financial'),
    (0, swagger_1.ApiOperation)({ summary: 'Lucro/Prejuízo por veículo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getFinancialPerVehicle", null);
__decorate([
    (0, common_1.Get)('mileage'),
    (0, swagger_1.ApiOperation)({ summary: 'Quilometragem por veículo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getMileagePerVehicle", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Relatórios'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map