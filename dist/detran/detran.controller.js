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
exports.DetranController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const detran_service_1 = require("./detran.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DetranController = class DetranController {
    constructor(detranService) {
        this.detranService = detranService;
    }
    queryVehicle(plate, renavam) {
        return this.detranService.queryVehicle(plate, renavam);
    }
    queryFines(plate) {
        return this.detranService.queryFines(plate);
    }
    queryIpva(renavam) {
        return this.detranService.queryIpva(renavam);
    }
    queryLicensing(renavam) {
        return this.detranService.queryLicensing(renavam);
    }
};
exports.DetranController = DetranController;
__decorate([
    (0, common_1.Get)('vehicle/:plate/:renavam'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulta completa de veículo no Detran PR (multas, IPVA, licenciamento)' }),
    __param(0, (0, common_1.Param)('plate')),
    __param(1, (0, common_1.Param)('renavam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DetranController.prototype, "queryVehicle", null);
__decorate([
    (0, common_1.Get)('fines/:plate'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar multas de um veículo' }),
    __param(0, (0, common_1.Param)('plate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetranController.prototype, "queryFines", null);
__decorate([
    (0, common_1.Get)('ipva/:renavam'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar situação do IPVA' }),
    __param(0, (0, common_1.Param)('renavam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetranController.prototype, "queryIpva", null);
__decorate([
    (0, common_1.Get)('licensing/:renavam'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar situação do licenciamento' }),
    __param(0, (0, common_1.Param)('renavam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetranController.prototype, "queryLicensing", null);
exports.DetranController = DetranController = __decorate([
    (0, swagger_1.ApiTags)('Detran PR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('detran'),
    __metadata("design:paramtypes", [detran_service_1.DetranService])
], DetranController);
//# sourceMappingURL=detran.controller.js.map