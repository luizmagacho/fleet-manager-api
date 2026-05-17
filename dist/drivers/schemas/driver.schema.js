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
exports.DriverSchema = exports.Driver = exports.LicenseCategory = exports.DriverStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["ACTIVE"] = "ACTIVE";
    DriverStatus["INACTIVE"] = "INACTIVE";
    DriverStatus["SUSPENDED"] = "SUSPENDED";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
var LicenseCategory;
(function (LicenseCategory) {
    LicenseCategory["A"] = "A";
    LicenseCategory["B"] = "B";
    LicenseCategory["AB"] = "AB";
    LicenseCategory["C"] = "C";
    LicenseCategory["D"] = "D";
    LicenseCategory["E"] = "E";
})(LicenseCategory || (exports.LicenseCategory = LicenseCategory = {}));
let Driver = class Driver {
};
exports.Driver = Driver;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "cpf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "licenseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: LicenseCategory }),
    __metadata("design:type", String)
], Driver.prototype, "licenseCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Driver.prototype, "licenseExpiration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "zipCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "profilePhoto", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "licenseDocument", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: DriverStatus, default: DriverStatus.ACTIVE }),
    __metadata("design:type", String)
], Driver.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Driver.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Driver.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Driver.prototype, "platforms", void 0);
exports.Driver = Driver = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'drivers' })
], Driver);
exports.DriverSchema = mongoose_1.SchemaFactory.createForClass(Driver);
exports.DriverSchema.index({ cpf: 1 });
exports.DriverSchema.index({ licenseNumber: 1 });
exports.DriverSchema.index({ status: 1 });
exports.DriverSchema.index({ name: 'text', cpf: 'text', email: 'text' });
//# sourceMappingURL=driver.schema.js.map