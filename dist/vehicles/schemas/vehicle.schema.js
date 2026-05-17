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
exports.VehicleSchema = exports.Vehicle = exports.TransmissionType = exports.FuelType = exports.VehicleStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["AVAILABLE"] = "AVAILABLE";
    VehicleStatus["RENTED"] = "RENTED";
    VehicleStatus["MAINTENANCE"] = "MAINTENANCE";
    VehicleStatus["INACTIVE"] = "INACTIVE";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
var FuelType;
(function (FuelType) {
    FuelType["FLEX"] = "FLEX";
    FuelType["GASOLINE"] = "GASOLINE";
    FuelType["ETHANOL"] = "ETHANOL";
    FuelType["DIESEL"] = "DIESEL";
    FuelType["ELECTRIC"] = "ELECTRIC";
    FuelType["HYBRID"] = "HYBRID";
})(FuelType || (exports.FuelType = FuelType = {}));
var TransmissionType;
(function (TransmissionType) {
    TransmissionType["MANUAL"] = "MANUAL";
    TransmissionType["AUTOMATIC"] = "AUTOMATIC";
    TransmissionType["CVT"] = "CVT";
})(TransmissionType || (exports.TransmissionType = TransmissionType = {}));
let Vehicle = class Vehicle {
};
exports.Vehicle = Vehicle;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "licensePlate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "modelYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "renavam", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "chassis", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: FuelType, default: FuelType.FLEX }),
    __metadata("design:type", String)
], Vehicle.prototype, "fuelType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: TransmissionType, default: TransmissionType.MANUAL }),
    __metadata("design:type", String)
], Vehicle.prototype, "transmission", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "mileage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: VehicleStatus, default: VehicleStatus.AVAILABLE }),
    __metadata("design:type", String)
], Vehicle.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Driver', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Vehicle.prototype, "currentDriverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Vehicle.prototype, "photos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "crlvDocument", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "insuranceDocument", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "insuranceExpiration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "ipvaDueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "licensingDueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "nextMaintenanceDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "nextMaintenanceMileage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "purchaseValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "currentValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "notes", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'vehicles' })
], Vehicle);
exports.VehicleSchema = mongoose_1.SchemaFactory.createForClass(Vehicle);
exports.VehicleSchema.index({ licensePlate: 1 });
exports.VehicleSchema.index({ renavam: 1 });
exports.VehicleSchema.index({ status: 1 });
exports.VehicleSchema.index({ brand: 'text', model: 'text', licensePlate: 'text' });
//# sourceMappingURL=vehicle.schema.js.map