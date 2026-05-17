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
exports.MaintenanceSchema = exports.Maintenance = exports.MaintenanceStatus = exports.MaintenanceType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var MaintenanceType;
(function (MaintenanceType) {
    MaintenanceType["PREVENTIVE"] = "PREVENTIVE";
    MaintenanceType["CORRECTIVE"] = "CORRECTIVE";
    MaintenanceType["INSPECTION"] = "INSPECTION";
})(MaintenanceType || (exports.MaintenanceType = MaintenanceType = {}));
var MaintenanceStatus;
(function (MaintenanceStatus) {
    MaintenanceStatus["SCHEDULED"] = "SCHEDULED";
    MaintenanceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    MaintenanceStatus["COMPLETED"] = "COMPLETED";
    MaintenanceStatus["CANCELLED"] = "CANCELLED";
})(MaintenanceStatus || (exports.MaintenanceStatus = MaintenanceStatus = {}));
let Maintenance = class Maintenance {
};
exports.Maintenance = Maintenance;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Vehicle', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Maintenance.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: MaintenanceType, required: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: MaintenanceStatus, default: MaintenanceStatus.SCHEDULED }),
    __metadata("design:type", String)
], Maintenance.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Maintenance.prototype, "scheduledDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Maintenance.prototype, "completedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "workshopName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "workshopPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Maintenance.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Maintenance.prototype, "parts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Maintenance.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Maintenance.prototype, "mileageAtService", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Maintenance.prototype, "nextServiceMileage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Maintenance.prototype, "nextServiceDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "receiptPath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "notes", void 0);
exports.Maintenance = Maintenance = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'maintenances' })
], Maintenance);
exports.MaintenanceSchema = mongoose_1.SchemaFactory.createForClass(Maintenance);
exports.MaintenanceSchema.index({ vehicleId: 1 });
exports.MaintenanceSchema.index({ status: 1 });
exports.MaintenanceSchema.index({ scheduledDate: 1 });
//# sourceMappingURL=maintenance.schema.js.map