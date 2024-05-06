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

@InputType()
export class HabitUpdateInput {
    @Field({ nullable: true })
    content: string;

    @Field(type => Int, { nullable: true })
    priority: number;

    @Field({ nullable: true })
    color: string;

    @Field({ nullable: true })
    isActivated: boolean;

    @Field({ nullable: true })
    createdAt: Date;

    @Field({ nullable: true })
    activatedAt: Date;
}
