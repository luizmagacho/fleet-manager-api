"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetranModule = void 0;
const common_1 = require("@nestjs/common");
const detran_controller_1 = require("./detran.controller");
const detran_service_1 = require("./detran.service");
let DetranModule = class DetranModule {
};
exports.DetranModule = DetranModule;
exports.DetranModule = DetranModule = __decorate([
    (0, common_1.Module)({
        controllers: [detran_controller_1.DetranController],
        providers: [detran_service_1.DetranService],
        exports: [detran_service_1.DetranService],
    })
], DetranModule);
//# sourceMappingURL=detran.module.js.map