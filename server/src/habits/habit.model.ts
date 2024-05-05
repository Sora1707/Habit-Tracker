import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Types } from "mongoose";

@ObjectType()
export class Habit {
    @Field()
    id: string;

    @Field()
    content: string;

    @Field(type => Int)
    priority: number;

    @Field()
    color: string;

    @Field()
    isActivated: boolean;
}
