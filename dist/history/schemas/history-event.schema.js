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
exports.HistoryEventSchema = exports.HistoryEvent = exports.EventType = exports.EventSource = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var EventSource;
(function (EventSource) {
    EventSource["USER"] = "USER";
    EventSource["SYSTEM"] = "SYSTEM";
    EventSource["DETRAN_PR"] = "DETRAN_PR";
})(EventSource || (exports.EventSource = EventSource = {}));
var EventType;
(function (EventType) {
    EventType["RENTAL_STARTED"] = "RENTAL_STARTED";
    EventType["RENTAL_ENDED"] = "RENTAL_ENDED";
    EventType["PAYMENT_RECEIVED"] = "PAYMENT_RECEIVED";
    EventType["PAYMENT_OVERDUE"] = "PAYMENT_OVERDUE";
    EventType["MAINTENANCE_SCHEDULED"] = "MAINTENANCE_SCHEDULED";
    EventType["MAINTENANCE_COMPLETED"] = "MAINTENANCE_COMPLETED";
    EventType["FINE_DETECTED"] = "FINE_DETECTED";
    EventType["FINE_PAID"] = "FINE_PAID";
    EventType["IPVA_DUE"] = "IPVA_DUE";
    EventType["IPVA_PAID"] = "IPVA_PAID";
    EventType["LICENSING_DUE"] = "LICENSING_DUE";
    EventType["LICENSING_COMPLETED"] = "LICENSING_COMPLETED";
    EventType["STATUS_CHANGED"] = "STATUS_CHANGED";
    EventType["DOCUMENT_UPDATED"] = "DOCUMENT_UPDATED";
    EventType["NOTE_ADDED"] = "NOTE_ADDED";
})(EventType || (exports.EventType = EventType = {}));
let HistoryEvent = class HistoryEvent {
};
exports.HistoryEvent = HistoryEvent;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Vehicle', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], HistoryEvent.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Driver', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], HistoryEvent.prototype, "driverId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: EventType, required: true }),
    __metadata("design:type", String)
], HistoryEvent.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: EventSource, default: EventSource.USER }),
    __metadata("design:type", String)
], HistoryEvent.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], HistoryEvent.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], HistoryEvent.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], HistoryEvent.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], HistoryEvent.prototype, "occurredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], HistoryEvent.prototype, "createdBy", void 0);
exports.HistoryEvent = HistoryEvent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'history_events' })
], HistoryEvent);
exports.HistoryEventSchema = mongoose_1.SchemaFactory.createForClass(HistoryEvent);
exports.HistoryEventSchema.index({ vehicleId: 1, occurredAt: -1 });
exports.HistoryEventSchema.index({ driverId: 1 });
exports.HistoryEventSchema.index({ type: 1 });
//# sourceMappingURL=history-event.schema.js.map