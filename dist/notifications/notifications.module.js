"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const notifications_service_1 = require("./notifications.service");
const notifications_controller_1 = require("./notifications.controller");
const email_service_1 = require("./email/email.service");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
const drivers_module_1 = require("../drivers/drivers.module");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const rentals_module_1 = require("../rentals/rentals.module");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            drivers_module_1.DriversModule,
            vehicles_module_1.VehiclesModule,
            rentals_module_1.RentalsModule,
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService, email_service_1.EmailService, whatsapp_service_1.WhatsAppService],
        exports: [email_service_1.EmailService, whatsapp_service_1.WhatsAppService, notifications_service_1.NotificationsService],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map