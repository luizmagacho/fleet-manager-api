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
exports.RentalsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rentals_service_1 = require("./rentals.service");
const create_rental_dto_1 = require("./dto/create-rental.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const rental_schema_1 = require("./schemas/rental.schema");
let RentalsController = class RentalsController {
    constructor(rentalsService) {
        this.rentalsService = rentalsService;
    }
    create(createRentalDto) {
        return this.rentalsService.create(createRentalDto);
    }
    findAll(page, limit, status) {
        return this.rentalsService.findAll(page, limit, status);
    }
    findOverdue() {
        return this.rentalsService.findOverduePayments();
    }
    getFinancialSummary() {
        return this.rentalsService.getFinancialSummary();
    }
    getPendingPayments() {
        return this.rentalsService.getPendingPayments();
    }
    findByDriver(driverId) {
        return this.rentalsService.findByDriver(driverId);
    }
    findByVehicle(vehicleId) {
        return this.rentalsService.findByVehicle(vehicleId);
    }
    findOne(id) {
        return this.rentalsService.findById(id);
    }
    update(id, updateRentalDto) {
        return this.rentalsService.update(id, updateRentalDto);
    }
    recordPayment(id, recordPaymentDto) {
        return this.rentalsService.recordPayment(id, recordPaymentDto);
    }
    terminate(id) {
        return this.rentalsService.terminate(id);
    }
};
exports.RentalsController = RentalsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo aluguel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rental_dto_1.CreateRentalDto]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os aluguéis' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: rental_schema_1.RentalStatus }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar aluguéis com pagamentos atrasados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findOverdue", null);
__decorate([
    (0, common_1.Get)('financial-summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumo financeiro dos aluguéis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "getFinancialSummary", null);
__decorate([
    (0, common_1.Get)('payments/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os pagamentos pendentes e atrasados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "getPendingPayments", null);
__decorate([
    (0, common_1.Get)('by-driver/:driverId'),
    (0, swagger_1.ApiOperation)({ summary: 'Aluguéis de um motorista específico' }),
    __param(0, (0, common_1.Param)('driverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findByDriver", null);
__decorate([
    (0, common_1.Get)('by-vehicle/:vehicleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Aluguéis de um veículo específico' }),
    __param(0, (0, common_1.Param)('vehicleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findByVehicle", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar aluguel por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar aluguel' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar pagamento de parcela' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rental_dto_1.RecordPaymentDto]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "recordPayment", null);
__decorate([
    (0, common_1.Put)(':id/terminate'),
    (0, swagger_1.ApiOperation)({ summary: 'Encerrar aluguel' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "terminate", null);
exports.RentalsController = RentalsController = __decorate([
    (0, swagger_1.ApiTags)('Aluguéis'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('rentals'),
    __metadata("design:paramtypes", [rentals_service_1.RentalsService])
], RentalsController);
//# sourceMappingURL=rentals.controller.js.map