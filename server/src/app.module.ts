import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { createBaseService, getBaseServiceToken } from "./BaseService";
import { Habit, HabitSchema } from "./habits/habit.schema";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { HabitResolver } from "./habits/habit.resolver";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `${configService.get("DATABASE_HOST")}:${configService.get("DATABASE_PORT")}/${configService.get("DATABASE_NAME")}`,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
    ],
    providers: [
        {
            provide: getBaseServiceToken(Habit),
            useClass: createBaseService(Habit),
        },
        HabitResolver,
    ],
})
export class AppModule {}
