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
exports.CreateDriverDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const driver_schema_1 = require("../schemas/driver.schema");
class CreateDriverDto {
}
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do motorista' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CPF (somente números)', example: '12345678901' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11),
    (0, class_validator_1.MaxLength)(14),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número da CNH', example: '01234567891' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(9),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Categoria da CNH', enum: driver_schema_1.LicenseCategory }),
    (0, class_validator_1.IsEnum)(driver_schema_1.LicenseCategory),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "licenseCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de validade da CNH' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateDriverDto.prototype, "licenseExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone', example: '41999997210' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'E-mail' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Endereço completo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cidade' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'CEP' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Plataformas de transporte (Uber, 99, InDriver...)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateDriverDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observações' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "notes", void 0);
//# sourceMappingURL=create-driver.dto.js.map