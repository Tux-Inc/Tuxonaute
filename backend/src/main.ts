import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.enableVersioning({
        type: VersioningType.URI,
    });

    const document = new DocumentBuilder()
        .setTitle("Notes API")
        .setDescription("The notes API description")
        .build();

    const writerDescriptorDocument = SwaggerModule.createDocument(
        app,
        document,
    );

    SwaggerModule.setup("api/inventory", app, writerDescriptorDocument);

    await app.listen(3000);
}
bootstrap();
