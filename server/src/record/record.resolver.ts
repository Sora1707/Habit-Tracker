import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from "@nestjs/graphql";
import { FilterQuery, Types } from "mongoose";
import { BaseService, InjectBaseService } from "@/BaseService";
import Record from "./record.model";
import { Record as RecordMongooseSchema } from "./record.schema";
import Habit from "../habit/habit.model";
import { Habit as HabitMongooseSchema } from "../habit/habit.schema";
import RecordFilterInput from "./record.partial";

@Resolver(of => Record)
export class RecordResolver {
    constructor(
        @InjectBaseService(Record)
        private recordService: BaseService<RecordMongooseSchema>,

        @InjectBaseService(Habit)
        private habitService: BaseService<HabitMongooseSchema>,
    ) {}

    @Query(returns => [Record], { name: "allRecords" })
    async getAll() {
        return await this.recordService.findMany({});
    }

    @Query(returns => [Record], { name: "findRecordsByDate" })
    async findRecordsByDate(
        @Args({ name: "year", type: () => Int }) year: number,
        @Args({ name: "month", type: () => Int }) month: number,
        @Args({ name: "day", type: () => Int }) day: number,
    ) {
        const date = `${year}/${month < 10 ? "0" : ""}${month}/${day < 10 ? "0" : ""}${day}`;
        return await this.recordService.findMany({ date });
    }

    @Query(returns => [Record], { name: "findManyRecords" })
    async findMany(
        @Args({ name: "filter", nullable: true, type: () => RecordFilterInput })
        filter: FilterQuery<RecordMongooseSchema>,
    ) {
        return await this.recordService.findMany(filter);
    }

    @Mutation(returns => Boolean, { name: "createRecord" })
    async create(
        @Args({ name: "habitId" }) habitId: string,
        @Args({ name: "date" }) date: string,
    ) {
        const result = await this.recordService.create({
            habit: new Types.ObjectId(habitId),
            date,
        });
        return !!result;
    }

    @Mutation(returns => Boolean, { name: "deleteRecordById" })
    async deleteRecordById(@Args({ name: "id" }) id: string) {
        const result = await this.recordService.removeById(id);
        return result.deletedCount !== 0;
    }

    @ResolveField("habit", returns => Habit)
    async habit(@Parent() record: RecordMongooseSchema) {
        const { habit } = record;
        return await this.habitService.findById(habit.toString());
    }
}
