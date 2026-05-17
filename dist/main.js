"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GestorFrota PR — API')
        .setDescription('API de gestão de frota de veículos para motoristas de aplicativo no Paraná')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Autenticação')
        .addTag('Motoristas')
        .addTag('Veículos')
        .addTag('Aluguéis')
        .addTag('Manutenções')
        .addTag('Detran PR')
        .addTag('Notificações')
        .addTag('Histórico')
        .addTag('Relatórios')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`🚀 GestorFrota PR API rodando em: http://localhost:${port}/api`);
    console.log(`📖 Swagger disponível em: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map