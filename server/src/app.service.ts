import { Controller, Get } from "@nestjs/common";
import { BaseService, InjectBaseService } from "./BaseService";
import { Habit } from "./habits/habit.schema";

@Controller("")
export class AppController {
    constructor(
        @InjectBaseService(Habit) public habitService: BaseService<Habit>,
    ) {}
    @Get()
    findAll() {
        return this.habitService.findMany({});
    }
}
