import Habit from "@/habit/habit.model";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Record {
    @Field()
    id: string;

    @Field(type => Habit)
    habit: Habit;

    @Field()
    date: string;
}
