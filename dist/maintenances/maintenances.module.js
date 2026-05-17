"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenancesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const maintenances_controller_1 = require("./maintenances.controller");
const maintenances_service_1 = require("./maintenances.service");
const maintenance_schema_1 = require("./schemas/maintenance.schema");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const history_module_1 = require("../history/history.module");
let MaintenancesModule = class MaintenancesModule {
};
exports.MaintenancesModule = MaintenancesModule;
exports.MaintenancesModule = MaintenancesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: maintenance_schema_1.Maintenance.name, schema: maintenance_schema_1.MaintenanceSchema },
            ]),
            vehicles_module_1.VehiclesModule,
            history_module_1.HistoryModule,
        ],
        controllers: [maintenances_controller_1.MaintenancesController],
        providers: [maintenances_service_1.MaintenancesService],
        exports: [maintenances_service_1.MaintenancesService],
    })
], MaintenancesModule);
//# sourceMappingURL=maintenances.module.js.map