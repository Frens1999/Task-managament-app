"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config = require("config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const serverConfig = config.get('server');
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder().setTitle('Task Management Api').setDescription('Task App Api').setVersion('1.0.0').addBearerAuth().build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map