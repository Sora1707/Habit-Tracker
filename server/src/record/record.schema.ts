import { Habit } from "@/habit/habit.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema()
export class Record {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Habit" })
    habit: Types.ObjectId;

    @Prop()
    date: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
