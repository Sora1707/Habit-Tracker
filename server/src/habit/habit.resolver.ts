import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import Habit from "./habit.model";
import { Habit as HabitMongooseSchema } from "./habit.schema";
import { BaseService, InjectBaseService } from "@/BaseService";
import { HabitFilterInput, HabitUpdateInput } from "./habit.partial";
import { FilterQuery } from "mongoose";

@Resolver(of => Habit)
export class HabitResolver {
    constructor(
        @InjectBaseService(Habit)
        private habitService: BaseService<HabitMongooseSchema>,
    ) {}

    @Query(returns => [Habit], { name: "allHabits" })
    async getAll() {
        return await this.habitService.findMany({});
    }

    @Query(returns => [Habit], { name: "findManyHabits" })
    async findMany(
        @Args({ name: "filter", nullable: true, type: () => HabitFilterInput })
        filter: FilterQuery<HabitMongooseSchema>,
    ) {
        return await this.habitService.findMany(filter);
    }

    @Mutation(returns => Boolean, { name: "updateHabitById" })
    async updateById(
        @Args({ name: "id" }) id: string,
        @Args({ name: "input", nullable: true, type: () => HabitUpdateInput })
        input: FilterQuery<HabitMongooseSchema>,
    ) {
        const result = await this.habitService.updateById(id, input);
        return !!result;
    }

    @Mutation(returns => Boolean, { name: "toggleHabitActivation" })
    async toggleHabitActivation(@Args({ name: "id" }) id: string) {
        const habit = await this.habitService.findById(id);
        const result = await this.habitService.updateById(id, {
            isActivated: !habit.isActivated,
        });
        return !!result;
    }

    @Mutation(returns => Boolean, { name: "createHabit" })
    async create(
        @Args({ name: "content" }) content: string,
        @Args({ name: "priority", type: () => Int }) priority: number,
        @Args({ name: "color" }) color: string,
    ) {
        const result = await this.habitService.create({
            content,
            priority,
            color,
        });
        return !!result;
    }
}
