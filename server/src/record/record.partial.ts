import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export default class RecordFilterInput {
    @Field(type => ID, { nullable: true })
    id: string;

    @Field({ nullable: true })
    date: string;
}
