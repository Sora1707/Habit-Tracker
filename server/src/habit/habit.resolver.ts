import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
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
}
