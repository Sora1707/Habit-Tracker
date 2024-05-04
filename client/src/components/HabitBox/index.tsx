import React, { useState, useEffect } from "react";
import { getStyle, getDateString } from "~/utils";
import styles from "./style.module.scss";
import { Habit, habitCompare } from "~/types/Habit";
import { Table } from "react-bootstrap";
import SwitchButton from "../SwtichButton";

const cx = getStyle(styles);

const myHabits: Habit[] = [
    {
        id: "123",
        content: "1",
        priority: 1,
        isActivated: true,
        color: "#000000",
        createdAt: new Date(),
        activatedAt: new Date(),
    },
    {
        id: "124",
        content: "2",
        priority: 2,
        isActivated: false,
        color: "#111111",
        createdAt: new Date(),
        activatedAt: new Date(),
    },
    {
        id: "124",
        content: "3",
        priority: 3,
        isActivated: false,
        color: "#111111",
        createdAt: new Date(),
        activatedAt: new Date(),
    },
    {
        id: "124",
        content: "4",
        priority: 4,
        isActivated: true,
        color: "#111111",
        createdAt: new Date(),
        activatedAt: new Date(),
    },
    {
        id: "125",
        content: "5",
        priority: 5,
        isActivated: true,
        color: "#111111",
        createdAt: new Date(),
        activatedAt: new Date(),
    },
];

function HabitBox() {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        setHabits(myHabits);
    }, []);

    function toggleHabitActivity(index: number) {
        // Create a completely new habits array
        const newHabits = [...habits];
        newHabits[index].isActivated = !newHabits[index].isActivated;
        setHabits(newHabits);
        // Change database
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Content</th>
                    <th>Created at</th>
                    <th>Last activated at</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {habits
                    /* sort by
                    1. activated
                    2. priority
                    3. time
                    */
                    // negative value => A first
                    .sort(habitCompare)
                    .map((habit, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{habit.content}</td>
                                <td>{getDateString(habit.createdAt)}</td>
                                <td>{getDateString(habit.activatedAt)}</td>
                                <td>
                                    <SwitchButton
                                        checked={habit.isActivated}
                                        onChange={() => {
                                            toggleHabitActivity(index);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </Table>
    );
}

export default HabitBox;
