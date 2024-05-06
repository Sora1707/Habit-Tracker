import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class HabitFilterInput {
    @Field(type => ID, { nullable: true })
    id: string;

    @Field({ nullable: true })
    content: string;

    @Field(type => Int, { nullable: true })
    priority: number;

    @Field({ nullable: true })
    color: string;

    @Field({ nullable: true })
    isActivated: boolean;
}
