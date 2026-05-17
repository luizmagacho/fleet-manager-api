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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const vehicle_schema_1 = require("../schemas/vehicle.schema");
class CreateVehicleDto {
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Placa do veículo', example: 'ABC1D23' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(7),
    (0, class_validator_1.MaxLength)(8),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "licensePlate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca', example: 'Toyota' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modelo', example: 'Corolla' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ano de fabricação', example: 2022 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1990),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ano do modelo', example: 2023 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "modelYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cor', example: 'Branco' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RENAVAM (11 dígitos)', example: '12345678901' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(9),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "renavam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chassi (17 caracteres)', example: '9BWZZZ377VT004251' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(17),
    (0, class_validator_1.MaxLength)(17),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "chassis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: vehicle_schema_1.FuelType, description: 'Tipo de combustível' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vehicle_schema_1.FuelType),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: vehicle_schema_1.TransmissionType, description: 'Tipo de câmbio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vehicle_schema_1.TransmissionType),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "transmission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Quilometragem atual' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de vencimento do IPVA' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateVehicleDto.prototype, "ipvaDueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de vencimento do licenciamento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateVehicleDto.prototype, "licensingDueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de vencimento do seguro' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateVehicleDto.prototype, "insuranceExpiration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Valor de compra' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "purchaseValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observações' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "notes", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map