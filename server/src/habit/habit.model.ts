import { Field, Int, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Habit {
    @Field(type => ID)
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
