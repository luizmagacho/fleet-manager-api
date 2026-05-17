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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRentalDto = exports.RecordPaymentDto = exports.CreateRentalDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const rental_schema_1 = require("../schemas/rental.schema");
class CreateRentalDto {
}
exports.CreateRentalDto = CreateRentalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do veículo' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do motorista' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "driverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de início do aluguel' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateRentalDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data prevista de encerramento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateRentalDto.prototype, "expectedEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor do aluguel por período', example: 1500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRentalDto.prototype, "rentalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frequência de pagamento', enum: rental_schema_1.PaymentFrequency }),
    (0, class_validator_1.IsEnum)(rental_schema_1.PaymentFrequency),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "paymentFrequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Valor da caução (depósito de segurança)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRentalDto.prototype, "securityDeposit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observações' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "notes", void 0);
class RecordPaymentDto {
}
exports.RecordPaymentDto = RecordPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do pagamento dentro do aluguel' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de pagamento' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RecordPaymentDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Método de pagamento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observações' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "notes", void 0);
class UpdateRentalDto extends (0, swagger_2.PartialType)(CreateRentalDto) {
}
exports.UpdateRentalDto = UpdateRentalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Status do aluguel', enum: ['ACTIVE', 'OVERDUE', 'COMPLETED', 'CANCELLED'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRentalDto.prototype, "status", void 0);
//# sourceMappingURL=create-rental.dto.js.map