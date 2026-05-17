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
var WhatsAppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio = require("twilio");
let WhatsAppService = WhatsAppService_1 = class WhatsAppService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(WhatsAppService_1.name);
        const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
        this.fromNumber = this.configService.get('TWILIO_WHATSAPP_FROM', 'whatsapp:+14155238886');
        if (accountSid && authToken) {
            this.client = twilio(accountSid, authToken);
        }
        else {
            this.logger.warn('Twilio credentials not configured — WhatsApp notifications disabled.');
        }
    }
    async send(payload) {
        if (!this.client) {
            this.logger.warn(`WhatsApp [MOCK] to ${payload.to}: ${payload.message}`);
            return;
        }
        try {
            const toFormatted = payload.to.startsWith('whatsapp:')
                ? payload.to
                : `whatsapp:+55${payload.to.replace(/\D/g, '')}`;
            await this.client.messages.create({
                from: this.fromNumber,
                to: toFormatted,
                body: payload.message,
            });
            this.logger.log(`WhatsApp enviado para: ${payload.to}`);
        }
        catch (error) {
            this.logger.error(`Falha ao enviar WhatsApp: ${error.message}`);
            throw error;
        }
    }
    async sendPaymentOverdueAlert(driverName, phone, plate, amount) {
        await this.send({
            to: phone,
            message: `⚠️ *GestorFrota PR* — Olá, ${driverName}!\n\nSeu pagamento de *R$ ${amount.toFixed(2)}* referente ao veículo *${plate}* está atrasado.\n\nRegularize sua situação para evitar suspensão do contrato.\n\nDúvidas? Responda esta mensagem. 🚗`,
        });
    }
    async sendLicenseExpirationWarning(driverName, phone, daysLeft) {
        await this.send({
            to: phone,
            message: `🔔 *GestorFrota PR* — Olá, ${driverName}!\n\nSua CNH vence em *${daysLeft} dias*.\n\nNão esqueça de renová-la para continuar operando normalmente! ✅`,
        });
    }
    async sendDocumentExpirationAlert(phone, plate, documentType, daysLeft) {
        const labels = {
            ipva: 'IPVA',
            licensing: 'Licenciamento',
            insurance: 'Seguro',
        };
        await this.send({
            to: phone,
            message: `📋 *GestorFrota PR* — O *${labels[documentType] ?? documentType}* do veículo *${plate}* vence em *${daysLeft} dias*.\n\nProvidencie a regularização. 🛡️`,
        });
    }
    async sendFineAlert(phone, plate, description, amount) {
        await this.send({
            to: phone,
            message: `🚨 *GestorFrota PR* — Nova multa detectada no veículo *${plate}*!\n\n*Infração:* ${description}\n*Valor:* R$ ${amount.toFixed(2)}\n\nVerifique no aplicativo para mais detalhes.`,
        });
    }
};
exports.WhatsAppService = WhatsAppService;
exports.WhatsAppService = WhatsAppService = WhatsAppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsAppService);
//# sourceMappingURL=whatsapp.service.js.map