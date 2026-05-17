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
var DetranService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetranService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let DetranService = DetranService_1 = class DetranService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(DetranService_1.name);
        this.token = null;
        this.tokenExpiresAt = 0;
        this.DETRAN_API_URL = this.configService.get('DETRAN_API_URL', 'https://apigateway.paas.pr.gov.br/detran/frotista/api/v1');
        this.AUTH_URL = this.configService.get('DETRAN_AUTH_URL', 'https://auth-cs.identidadedigital.pr.gov.br/centralautenticacao/api/v1/token/jwt');
    }
    async getAuthToken() {
        if (this.token && Date.now() < this.tokenExpiresAt) {
            return this.token;
        }
        const clientId = this.configService.get('DETRAN_CLIENT_ID');
        const clientSecret = this.configService.get('DETRAN_CLIENT_SECRET');
        if (!clientId || !clientSecret) {
            this.logger.warn('Credenciais do Detran (Client ID/Secret) não configuradas. Retornando mock de token.');
            return 'mock_token';
        }
        try {
            const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
            const response = await fetch(this.AUTH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    scope: 'frotista.api',
                }),
            });
            if (!response.ok) {
                throw new Error(`Erro na autenticação: ${response.statusText}`);
            }
            const data = await response.json();
            this.token = data.access_token;
            this.tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000;
            return this.token;
        }
        catch (error) {
            this.logger.error('Falha ao obter token do Detran', error);
            throw new common_1.HttpException('Falha na autenticação com Detran', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async requestApi(endpoint, options = {}) {
        const token = await this.getAuthToken();
        if (token === 'mock_token') {
            return null;
        }
        const url = `${this.DETRAN_API_URL}${endpoint}`;
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'consumerId': 'DETRANFROTISTAAPI',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                if (response.status === 429) {
                    throw new common_1.HttpException('Limite de requisições excedido', common_1.HttpStatus.TOO_MANY_REQUESTS);
                }
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            this.logger.error(`Erro ao consultar endpoint ${endpoint}:`, error);
            throw new common_1.HttpException('Erro na consulta ao Detran', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async queryVehicle(licensePlate, renavam) {
        this.logger.log(`Consultando Detran PR para placa: ${licensePlate}`);
        const data = await this.requestApi(`/veiculos/${renavam}?placa=${licensePlate}`);
        if (!data) {
            this.logger.log('Usando dados simulados pois a API real não está configurada');
            return this.mockVehicleQuery(licensePlate, renavam);
        }
        const vehicleInfo = {
            licensePlate: licensePlate,
            renavam: renavam,
            brand: data.marcaModelo?.split('/')[0] || 'Desconhecida',
            model: data.marcaModelo?.split('/')[1] || 'Desconhecido',
            year: data.anoFabricacao || new Date().getFullYear(),
            color: data.cor || 'Desconhecida',
            fines: await this.queryFines(licensePlate),
            ipva: await this.queryIpva(renavam),
            licensing: await this.queryLicensing(renavam),
            queriedAt: new Date(),
        };
        return vehicleInfo;
    }
    async queryFines(licensePlate) {
        this.logger.log(`Consultando multas para placa: ${licensePlate}`);
        const data = await this.requestApi(`/veiculos/placa/${licensePlate}/multas`);
        if (!data) {
            const mockResult = this.mockVehicleQuery(licensePlate, '');
            return mockResult.fines;
        }
        return (data.multas || []).map((m) => ({
            id: m.codAuto || `FINE-${Date.now()}`,
            date: `${m.dataInfracao} ${m.horaInfracao}`,
            description: m.descrInfracao || 'Multa de Trânsito',
            amount: m.valorOriginal || 0,
            points: 0,
            status: 'PENDING',
            location: m.localInfracao || 'Não especificado',
            agent: m.nomeOrgaoAutuador || 'Detran/PR',
        }));
    }
    async queryIpva(renavam) {
        this.logger.log(`Consultando IPVA para RENAVAM: ${renavam}`);
        const data = await this.requestApi(`/veiculos/${renavam}/ipva`);
        if (!data) {
            const mockResult = this.mockVehicleQuery('', renavam);
            return mockResult.ipva;
        }
        const totalAmount = data.totalDebitos || 0;
        return {
            year: new Date().getFullYear(),
            totalAmount,
            paidInstallments: 0,
            totalInstallments: 3,
            status: totalAmount > 0 ? 'PENDING' : 'PAID',
            dueDate: data.ipva?.dueDate || new Date().toISOString(),
        };
    }
    async queryLicensing(renavam) {
        this.logger.log(`Consultando licenciamento para RENAVAM: ${renavam}`);
        const data = await this.requestApi(`/veiculos/${renavam}/licenciamento`);
        if (!data) {
            const mockResult = this.mockVehicleQuery('', renavam);
            return mockResult.licensing;
        }
        return {
            year: new Date().getFullYear(),
            status: data.totalDebitos > 0 ? 'PENDING' : 'VALID',
            expirationDate: new Date(new Date().getFullYear() + 1, 0, 1).toISOString(),
            restrictions: [],
        };
    }
    mockVehicleQuery(licensePlate, renavam) {
        const seed = licensePlate.charCodeAt(0) + licensePlate.charCodeAt(1) || 123;
        const hasFines = seed % 3 === 0;
        const ipvaStatus = seed % 4 === 0 ? 'OVERDUE' : seed % 2 === 0 ? 'PARTIAL' : 'PAID';
        const now = new Date();
        const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), 15);
        return {
            licensePlate: licensePlate.toUpperCase(),
            renavam: renavam || '12345678901',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2021,
            color: 'Branco',
            fines: hasFines
                ? [
                    {
                        id: `FINE-${Date.now()}`,
                        date: new Date(now.getFullYear(), now.getMonth() - 2, 10).toISOString(),
                        description: 'Excesso de velocidade (até 20% acima do limite)',
                        amount: 130.16,
                        points: 4,
                        status: 'PENDING',
                        location: 'BR-277, km 123 - Curitiba/PR',
                        agent: 'PRF',
                    },
                ]
                : [],
            ipva: {
                year: now.getFullYear(),
                totalAmount: 1850.0,
                paidInstallments: ipvaStatus === 'PAID' ? 3 : ipvaStatus === 'PARTIAL' ? 1 : 0,
                totalInstallments: 3,
                status: ipvaStatus,
                dueDate: new Date(now.getFullYear(), 2, 31).toISOString(),
            },
            licensing: {
                year: now.getFullYear(),
                status: seed % 5 === 0 ? 'EXPIRED' : 'VALID',
                expirationDate: nextYear.toISOString(),
                restrictions: [],
            },
            queriedAt: new Date(),
        };
    }
};
exports.DetranService = DetranService;
exports.DetranService = DetranService = DetranService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DetranService);
//# sourceMappingURL=detran.service.js.map