import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { createBaseService, getBaseServiceToken } from "./BaseService";
import { Habit, HabitSchema } from "./habits/habit.schema";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `${configService.get("DATABASE_HOST")}:${configService.get("DATABASE_PORT")}/${configService.get("DATABASE_NAME")}`,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
    ],
    controllers: [AppController],
    providers: [
        {
            provide: getBaseServiceToken(Habit),
            useClass: createBaseService(Habit),
        },
    ],
})
export class AppModule {}
