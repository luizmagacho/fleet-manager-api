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
exports.UpdateDriverDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_driver_dto_1 = require("./create-driver.dto");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
const driver_schema_1 = require("../schemas/driver.schema");
class UpdateDriverDto extends (0, swagger_1.PartialType)(create_driver_dto_1.CreateDriverDto) {
}
exports.UpdateDriverDto = UpdateDriverDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Status do motorista', enum: driver_schema_1.DriverStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(driver_schema_1.DriverStatus),
    __metadata("design:type", String)
], UpdateDriverDto.prototype, "status", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Avaliação (0-5)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateDriverDto.prototype, "rating", void 0);
//# sourceMappingURL=update-driver.dto.js.map