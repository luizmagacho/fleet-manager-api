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
exports.RentalsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const mongoose_2 = require("mongoose");
const rental_schema_1 = require("./schemas/rental.schema");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const vehicle_schema_1 = require("../vehicles/schemas/vehicle.schema");
let RentalsService = class RentalsService {
    constructor(rentalModel, vehiclesService) {
        this.rentalModel = rentalModel;
        this.vehiclesService = vehiclesService;
    }
    generatePaymentSchedule(startDate, amount, frequency, expectedEndDate) {
        const payments = [];
        let currentDate = new Date(startDate);
        const end = expectedEndDate ? new Date(expectedEndDate) : null;
        let maxPeriods = 12;
        if (end) {
            const diffTime = Math.abs(end.getTime() - currentDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (frequency === rental_schema_1.PaymentFrequency.WEEKLY)
                maxPeriods = Math.max(1, Math.ceil(diffDays / 7));
            else if (frequency === rental_schema_1.PaymentFrequency.BIWEEKLY)
                maxPeriods = Math.max(1, Math.ceil(diffDays / 14));
            else
                maxPeriods = Math.max(1, Math.ceil(diffDays / 30));
        }
        for (let i = 0; i < maxPeriods; i++) {
            payments.push({
                dueDate: new Date(currentDate),
                amount,
                status: rental_schema_1.PaymentStatus.PENDING,
            });
            if (frequency === rental_schema_1.PaymentFrequency.WEEKLY) {
                currentDate.setDate(currentDate.getDate() + 7);
            }
            else if (frequency === rental_schema_1.PaymentFrequency.BIWEEKLY) {
                currentDate.setDate(currentDate.getDate() + 14);
            }
            else {
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        }
        return payments;
    }
    async create(createRentalDto) {
        const vehicle = await this.vehiclesService.findById(createRentalDto.vehicleId);
        if (vehicle.status !== vehicle_schema_1.VehicleStatus.AVAILABLE) {
            throw new common_1.BadRequestException('Este veículo não está disponível para aluguel.');
        }
        const payments = this.generatePaymentSchedule(createRentalDto.startDate, createRentalDto.rentalAmount, createRentalDto.paymentFrequency, createRentalDto.expectedEndDate);
        const rental = new this.rentalModel({
            ...createRentalDto,
            vehicleId: new mongoose_2.Types.ObjectId(createRentalDto.vehicleId),
            driverId: new mongoose_2.Types.ObjectId(createRentalDto.driverId),
            payments,
        });
        await this.vehiclesService.updateStatus(createRentalDto.vehicleId, vehicle_schema_1.VehicleStatus.RENTED, createRentalDto.driverId);
        return rental.save();
    }
    async update(id, updateData) {
        const existingRental = await this.rentalModel.findById(id);
        if (!existingRental)
            throw new common_1.NotFoundException(`Aluguel com ID ${id} não encontrado.`);
        let newPayments = existingRental.payments;
        if (updateData.startDate || updateData.expectedEndDate || updateData.paymentFrequency || updateData.rentalAmount) {
            const startDate = updateData.startDate || existingRental.startDate;
            const expectedEndDate = updateData.expectedEndDate || existingRental.expectedEndDate;
            const amount = updateData.rentalAmount || existingRental.rentalAmount;
            const frequency = updateData.paymentFrequency || existingRental.paymentFrequency;
            const generated = this.generatePaymentSchedule(startDate, amount, frequency, expectedEndDate);
            const paidPayments = existingRental.payments.filter(p => p.status !== rental_schema_1.PaymentStatus.PENDING);
            const pendingGenerated = generated.slice(paidPayments.length);
            newPayments = [...paidPayments, ...pendingGenerated];
        }
        const rental = await this.rentalModel.findByIdAndUpdate(id, { $set: { ...updateData, payments: newPayments } }, { new: true });
        if (!rental)
            throw new common_1.NotFoundException(`Aluguel com ID ${id} não encontrado.`);
        return rental;
    }
    async findAll(page = 1, limit = 10, status) {
        const filter = {};
        if (status)
            filter.status = status;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.rentalModel
                .find(filter)
                .populate('vehicleId', 'licensePlate brand model color')
                .populate('driverId', 'name phone email cpf')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.rentalModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findById(id) {
        const rental = await this.rentalModel
            .findById(id)
            .populate('vehicleId', 'licensePlate brand model color year')
            .populate('driverId', 'name phone email cpf licenseNumber');
        if (!rental)
            throw new common_1.NotFoundException(`Aluguel com ID ${id} não encontrado.`);
        return rental;
    }
    async findByDriver(driverId) {
        return this.rentalModel
            .find({ driverId: new mongoose_2.Types.ObjectId(driverId) })
            .populate('vehicleId', 'licensePlate brand model color')
            .sort({ createdAt: -1 });
    }
    async findByVehicle(vehicleId) {
        return this.rentalModel
            .find({ vehicleId: new mongoose_2.Types.ObjectId(vehicleId) })
            .populate('driverId', 'name phone email cpf')
            .sort({ createdAt: -1 });
    }
    async recordPayment(rentalId, recordPaymentDto) {
        const rental = await this.rentalModel.findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(rentalId),
            'payments._id': new mongoose_2.Types.ObjectId(recordPaymentDto.paymentId),
        }, {
            $set: {
                'payments.$.status': rental_schema_1.PaymentStatus.PAID,
                'payments.$.paidAt': recordPaymentDto.paidAt,
                'payments.$.paymentMethod': recordPaymentDto.paymentMethod,
                'payments.$.notes': recordPaymentDto.notes,
            },
        }, { new: true });
        if (!rental)
            throw new common_1.NotFoundException('Aluguel ou pagamento não encontrado.');
        return rental;
    }
    async terminate(id) {
        const rental = await this.rentalModel.findById(id);
        if (!rental)
            throw new common_1.NotFoundException(`Aluguel com ID ${id} não encontrado.`);
        rental.status = rental_schema_1.RentalStatus.COMPLETED;
        rental.endDate = new Date();
        await rental.save();
        await this.vehiclesService.updateStatus(rental.vehicleId.toString(), vehicle_schema_1.VehicleStatus.AVAILABLE);
        return rental;
    }
    async findOverduePayments() {
        const now = new Date();
        return this.rentalModel
            .find({
            status: rental_schema_1.RentalStatus.ACTIVE,
            payments: {
                $elemMatch: {
                    status: rental_schema_1.PaymentStatus.PENDING,
                    dueDate: { $lt: now },
                },
            },
        })
            .populate('vehicleId', 'licensePlate brand model')
            .populate('driverId', 'name phone email');
    }
    async getPendingPayments() {
        return this.rentalModel.aggregate([
            { $match: { status: rental_schema_1.RentalStatus.ACTIVE } },
            { $unwind: '$payments' },
            { $match: { 'payments.status': { $in: [rental_schema_1.PaymentStatus.PENDING, rental_schema_1.PaymentStatus.OVERDUE] } } },
            { $sort: { 'payments.dueDate': 1 } },
            {
                $lookup: {
                    from: 'drivers',
                    localField: 'driverId',
                    foreignField: '_id',
                    as: 'driver',
                },
            },
            {
                $lookup: {
                    from: 'vehicles',
                    localField: 'vehicleId',
                    foreignField: '_id',
                    as: 'vehicle',
                },
            },
            { $unwind: '$driver' },
            { $unwind: '$vehicle' },
            {
                $project: {
                    _id: 0,
                    rentalId: '$_id',
                    paymentId: '$payments._id',
                    dueDate: '$payments.dueDate',
                    amount: '$payments.amount',
                    status: '$payments.status',
                    driverName: '$driver.name',
                    vehiclePlate: '$vehicle.licensePlate',
                    vehicleModel: '$vehicle.model',
                },
            },
        ]);
    }
    async checkOverduePayments() {
        const now = new Date();
        const rentals = await this.rentalModel.find({
            status: rental_schema_1.RentalStatus.ACTIVE,
            'payments': {
                $elemMatch: {
                    status: rental_schema_1.PaymentStatus.PENDING,
                    dueDate: { $lt: now }
                }
            }
        }).populate('driverId', 'name');
        let totalUpdated = 0;
        for (const rental of rentals) {
            let updated = false;
            rental.payments.forEach(payment => {
                if (payment.status === rental_schema_1.PaymentStatus.PENDING && payment.dueDate < now) {
                    payment.status = rental_schema_1.PaymentStatus.OVERDUE;
                    updated = true;
                    totalUpdated++;
                }
            });
            if (updated) {
                await rental.save();
            }
        }
        if (totalUpdated > 0) {
            console.log(`[Cron] Marcados ${totalUpdated} pagamentos como OVERDUE.`);
        }
    }
    async getFinancialSummary() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const result = await this.rentalModel.aggregate([
            {
                $unwind: '$payments',
            },
            {
                $facet: {
                    totalReceived: [
                        { $match: { 'payments.status': rental_schema_1.PaymentStatus.PAID } },
                        { $group: { _id: null, total: { $sum: '$payments.amount' } } },
                    ],
                    receivedThisMonth: [
                        {
                            $match: {
                                'payments.status': rental_schema_1.PaymentStatus.PAID,
                                'payments.paidAt': { $gte: startOfMonth },
                            },
                        },
                        { $group: { _id: null, total: { $sum: '$payments.amount' } } },
                    ],
                    pendingAmount: [
                        { $match: { 'payments.status': rental_schema_1.PaymentStatus.PENDING } },
                        { $group: { _id: null, total: { $sum: '$payments.amount' } } },
                    ],
                    overdueAmount: [
                        {
                            $match: {
                                'payments.status': rental_schema_1.PaymentStatus.PENDING,
                                'payments.dueDate': { $lt: now },
                            },
                        },
                        { $group: { _id: null, total: { $sum: '$payments.amount' } } },
                    ],
                },
            },
        ]);
        return {
            totalReceived: result[0]?.totalReceived[0]?.total ?? 0,
            receivedThisMonth: result[0]?.receivedThisMonth[0]?.total ?? 0,
            pendingAmount: result[0]?.pendingAmount[0]?.total ?? 0,
            overdueAmount: result[0]?.overdueAmount[0]?.total ?? 0,
        };
    }
};
exports.RentalsService = RentalsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalsService.prototype, "checkOverduePayments", null);
exports.RentalsService = RentalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rental_schema_1.Rental.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        vehicles_service_1.VehiclesService])
], RentalsService);
//# sourceMappingURL=rentals.service.js.map