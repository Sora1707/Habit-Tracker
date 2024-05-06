import Habit from "@/habit/habit.model";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Record {
    @Field(type => ID)
    id: string;

    @Field(type => Habit)
    habit: Habit;

    @Field()
    date: string;
}
