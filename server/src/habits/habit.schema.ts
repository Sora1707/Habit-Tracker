import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Habit {
    @Prop()
    content: string;

    @Prop()
    priority: number;

    @Prop()
    color: string;

    @Prop()
    isActivated: boolean;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
