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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const drivers_service_1 = require("./drivers.service");
const create_driver_dto_1 = require("./dto/create-driver.dto");
const update_driver_dto_1 = require("./dto/update-driver.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const driver_schema_1 = require("./schemas/driver.schema");
let DriversController = class DriversController {
    constructor(driversService) {
        this.driversService = driversService;
    }
    create(createDriverDto) {
        return this.driversService.create(createDriverDto);
    }
    findAll(page, limit, search, status) {
        return this.driversService.findAll(page, limit, search, status);
    }
    findExpiringLicenses(days) {
        return this.driversService.findWithExpiringLicense(days);
    }
    countByStatus() {
        return this.driversService.countByStatus();
    }
    findOne(id) {
        return this.driversService.findById(id);
    }
    update(id, updateDriverDto) {
        return this.driversService.update(id, updateDriverDto);
    }
    uploadPhoto(id, file) {
        return this.driversService.updatePhoto(id, `/uploads/drivers/${file.filename}`);
    }
    remove(id) {
        return this.driversService.remove(id);
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar novo motorista' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Motorista cadastrado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'CPF ou CNH já cadastrado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_dto_1.CreateDriverDto]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os motoristas' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: driver_schema_1.DriverStatus }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('alerts/expiring-license'),
    (0, swagger_1.ApiOperation)({ summary: 'Motoristas com CNH próxima ao vencimento' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, type: Number }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "findExpiringLicenses", null);
__decorate([
    (0, common_1.Get)('stats/by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Estatísticas de motoristas por status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "countByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar motorista por ID' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Motorista não encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar dados do motorista' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_driver_dto_1.UpdateDriverDto]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/photo'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload da foto do motorista' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/drivers',
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                return cb(new Error('Apenas imagens são permitidas!'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remover motorista' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DriversController.prototype, "remove", null);
exports.DriversController = DriversController = __decorate([
    (0, swagger_1.ApiTags)('Motoristas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('drivers'),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map