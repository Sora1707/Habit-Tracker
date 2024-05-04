export type Habit = {
    id: string;
    content: string;
    priority: number;
    isActivated: boolean;
    color: string;
    createdAt: Date;
    activatedAt: Date;
};

export function habitCompare(habitA: Habit, habitB: Habit) {
    if (habitA.isActivated) return -1;
    if (habitB.isActivated) return 1;

    if (habitA.priority > habitB.priority) return -1;
    if (habitA.priority < habitB.priority) return 1;

    const habitAactivatedAt = habitA.activatedAt.getSeconds();
    const habitBactivatedAt = habitB.activatedAt.getSeconds();

    if (habitAactivatedAt > habitBactivatedAt) return -1;
    if (habitAactivatedAt < habitBactivatedAt) return 1;

    const habitAcreatedAt = habitA.createdAt.getSeconds();
    const habitBcreatedAt = habitB.createdAt.getSeconds();

    if (habitAcreatedAt > habitBcreatedAt) return -1;
    if (habitAcreatedAt < habitBcreatedAt) return 1;

    return 1;
}
