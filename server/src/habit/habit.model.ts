import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Habit {
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
