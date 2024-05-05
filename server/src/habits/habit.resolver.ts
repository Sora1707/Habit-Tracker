import { Query, Resolver } from "@nestjs/graphql";
import { Habit } from "./habit.model";
import { Habit as HabitMongooseSchema } from "./habit.schema";
import { BaseService, InjectBaseService } from "@/BaseService";

@Resolver(of => Habit)
export class HabitResolver {
    constructor(
        @InjectBaseService(Habit)
        private habitService: BaseService<HabitMongooseSchema>,
    ) {}

    @Query(returns => [Habit], { name: "allHabits" })
    async getAllHabits() {
        return this.habitService.findMany({});
    }
}
