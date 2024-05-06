import React, { useState, useEffect, JSX } from "react";
import { getStyle, getDateString } from "~/utils";
import styles from "./HabitsManager.module.scss";
import { Habit, habitCompare } from "~/types/Habit";
import { Table } from "react-bootstrap";
import SwitchButton from "../SwitchButton";
import { dataMutation, dataQuery } from "~/services";

const cx = getStyle(styles);

// const myHabits: Habit[] = [
//     {
//         id: "123",
//         content: "1",
//         priority: 1,
//         isActivated: true,
//         color: "#000000",
//         createdAt: new Date(),
//         activatedAt: new Date(),
//     },
//     {
//         id: "124",
//         content: "2",
//         priority: 2,
//         isActivated: false,
//         color: "#111111",
//         createdAt: new Date(),
//         activatedAt: new Date(),
//     },
//     {
//         id: "124",
//         content: "3",
//         priority: 3,
//         isActivated: false,
//         color: "#111111",
//         createdAt: new Date(),
//         activatedAt: new Date(),
//     },
//     {
//         id: "124",
//         content: "4",
//         priority: 4,
//         isActivated: true,
//         color: "#111111",
//         createdAt: new Date(),
//         activatedAt: new Date(),
//     },
//     {
//         id: "125",
//         content: "5",
//         priority: 5,
//         isActivated: true,
//         color: "#111111",
//         createdAt: new Date(),
//         activatedAt: new Date(),
//     },
// ];

function HabitBox() {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const query = `
        allHabits {
            id,
            content,
            color,
            priority,
            isActivated
        }
        `;
        dataQuery(query, "allHabits").then((habits: Habit[]) =>
            setHabits(habits)
        );
    }, []);

    async function toggleHabitActivity(index: number) {
        // Change database
        const query = `
        toggleHabitActivation(id: "${habits[index].id}") 
        `;
        await dataMutation(query, "toggleHabitActivation");

        // Create a completely new habits array
        const newHabits = [...habits];
        newHabits[index].isActivated = !newHabits[index].isActivated;
        console.log("update");
        setHabits(newHabits);
    }

    // Divide into "Activated" and "Inactivated"
    const activatedHabitsRows: JSX.Element[] = [];
    const inactivatedHabitsRows: JSX.Element[] = [];
    habits.sort(habitCompare).forEach((habit, index) => {
        const rows = habit.isActivated
            ? activatedHabitsRows
            : inactivatedHabitsRows;
        rows.push(
            <tr key={index}>
                <td>{rows.length + 1}</td>
                <td>{habit.content}</td>
                {/* <td>{getDateString(habit.createdAt)}</td>
                <td>{getDateString(habit.activatedAt)}</td> */}
                <td></td>
                <td></td>
                <td>
                    <SwitchButton
                        checked={habit.isActivated}
                        onChange={async () => {
                            await toggleHabitActivity(index);
                        }}
                    />
                </td>
            </tr>
        );
    });

    return (
        <div className={cx("container")}>
            <div className={cx("activated-habits")}>
                <h3>Activated Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Content</th>
                            <th>Created at</th>
                            <th>Last activated at</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{activatedHabitsRows}</tbody>
                </Table>
            </div>
            <div className={cx("inactivated-habits")}>
                <h3>Inactivated Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Content</th>
                            <th>Created at</th>
                            <th>Last activated at</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{inactivatedHabitsRows}</tbody>
                </Table>
            </div>
        </div>
    );
}

export default HabitBox;
