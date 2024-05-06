import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import Habit from "./habit.model";
import { Habit as HabitMongooseSchema } from "./habit.schema";
import { BaseService, InjectBaseService } from "@/BaseService";

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
