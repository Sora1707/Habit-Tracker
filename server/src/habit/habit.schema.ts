import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: false,
    },
})
export class Habit {
    @Prop()
    content: string;

    @Prop()
    priority: number;

    @Prop()
    color: string;

    @Prop({ default: false })
    isActivated: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    activatedAt: Date;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);

HabitSchema.pre("save", async function (next) {
    if (!this.activatedAt) {
        this.activatedAt = new Date();
    }
    next();
});
