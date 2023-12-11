import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { NotesModule } from "./notes/note.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: (process.env.MARIADB_TYPE as any) || "mariadb",
            host: process.env.MARIADB_HOST || "db",
            port: parseInt(process.env.MARIADB_PORT) || 3306,
            database: process.env.MARIADB_DB || "tuxonaute_db",
            username: process.env.MARIADB_USERNAME || "tuxonaute",
            password: process.env.MARIADB_PASSWORD || "password",
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
        NotesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
