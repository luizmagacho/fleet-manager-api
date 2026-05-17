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
exports.RentalSchema = exports.Rental = exports.Payment = exports.PaymentStatus = exports.PaymentFrequency = exports.RentalStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var RentalStatus;
(function (RentalStatus) {
    RentalStatus["ACTIVE"] = "ACTIVE";
    RentalStatus["OVERDUE"] = "OVERDUE";
    RentalStatus["COMPLETED"] = "COMPLETED";
    RentalStatus["CANCELLED"] = "CANCELLED";
})(RentalStatus || (exports.RentalStatus = RentalStatus = {}));
var PaymentFrequency;
(function (PaymentFrequency) {
    PaymentFrequency["WEEKLY"] = "WEEKLY";
    PaymentFrequency["BIWEEKLY"] = "BIWEEKLY";
    PaymentFrequency["MONTHLY"] = "MONTHLY";
})(PaymentFrequency || (exports.PaymentFrequency = PaymentFrequency = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["OVERDUE"] = "OVERDUE";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Payment.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Payment.prototype, "paidAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Payment.prototype, "receiptPath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Payment.prototype, "notes", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], Payment);
let Rental = class Rental {
};
exports.Rental = Rental;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Vehicle', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Rental.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Driver', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Rental.prototype, "driverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Rental.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Rental.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Rental.prototype, "expectedEndDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Rental.prototype, "rentalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: PaymentFrequency, required: true }),
    __metadata("design:type", String)
], Rental.prototype, "paymentFrequency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: RentalStatus, default: RentalStatus.ACTIVE }),
    __metadata("design:type", String)
], Rental.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Payment], default: [] }),
    __metadata("design:type", Array)
], Rental.prototype, "payments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Rental.prototype, "securityDeposit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Rental.prototype, "contractPath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Rental.prototype, "notes", void 0);
exports.Rental = Rental = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'rentals' })
], Rental);
exports.RentalSchema = mongoose_1.SchemaFactory.createForClass(Rental);
exports.RentalSchema.index({ vehicleId: 1 });
exports.RentalSchema.index({ driverId: 1 });
exports.RentalSchema.index({ status: 1 });
exports.RentalSchema.index({ 'payments.dueDate': 1, 'payments.status': 1 });
//# sourceMappingURL=rental.schema.js.map