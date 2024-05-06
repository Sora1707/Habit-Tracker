import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { createBaseService, getBaseServiceToken } from "./BaseService";
import { Habit, HabitSchema } from "./habit/habit.schema";
import { HabitResolver } from "./habit/habit.resolver";
import { Record, RecordSchema } from "./record/record.schema";
import { RecordResolver } from "./record/record.resolver";

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
        MongooseModule.forFeature([
            { name: Record.name, schema: RecordSchema },
        ]),
    ],
    providers: [
        {
            provide: getBaseServiceToken(Habit),
            useClass: createBaseService(Habit),
        },
        HabitResolver,

        {
            provide: getBaseServiceToken(Record),
            useClass: createBaseService(Record),
        },
        RecordResolver,
    ],
})
export class AppModule {}
