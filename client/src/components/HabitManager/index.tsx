import React, { useState, useEffect, JSX } from "react";
import { getStyle, getDateStringByDate } from "~/utils";
import styles from "./HabitManager.module.scss";
import { Habit, habitCompare } from "~/types";
import { Table } from "react-bootstrap";
import SwitchButton from "../SwitchButton";
import { dataMutation, dataQuery } from "~/services";

const cx = getStyle(styles);

function HabitManager() {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const query = `
        allHabits {
            id,
            content,
            color,
            priority,
            isActivated,
            createdAt,
            activatedAt
        }
        `;
        dataQuery(query, "allHabits").then(
            (habits: (Habit & { createdAt: string; updatedAt: string })[]) => {
                setHabits(
                    habits.map(habit => ({
                        ...habit,
                        createdAt: new Date(habit.createdAt),
                        activatedAt: new Date(habit.activatedAt),
                    }))
                );
            }
        );
    }, []);

    async function toggleHabitActivity(index: number) {
        const isActivated = habits[index].isActivated;
        // Change database
        const query = `
        updateHabitById(id: "${habits[index].id}", input: { 
            isActivated: ${!isActivated}
            ${
                isActivated
                    ? ""
                    : `activatedAt: "${getDateStringByDate(new Date())}"`
            }
        }) 
        `;
        await dataMutation(query, "updateHabitById");

        // Create a completely new habits array
        const newHabits = [...habits];
        newHabits[index].isActivated = !isActivated;
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
                <td>{habit.priority}</td>
                <td>{getDateStringByDate(habit.createdAt)}</td>
                <td>{getDateStringByDate(habit.activatedAt)}</td>
                <td>
                    <SwitchButton
                        disabled={false}
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
            <div className={cx("activated-habits", "table")}>
                <h3>Activated Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx("index-column")}>#</th>
                            <th>Habit</th>
                            <th className={cx("smaller-column")}>Priority</th>
                            <th className={cx("medium-column")}>Created at</th>
                            <th className={cx("medium-column")}>
                                Last activated at
                            </th>
                            <th className={cx("smaller-column")}>Status</th>
                        </tr>
                    </thead>
                    <tbody>{activatedHabitsRows}</tbody>
                </Table>
            </div>
            <div className={cx("inactivated-habits, table")}>
                <h3>Inactivated Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx("index-column")}>#</th>
                            <th>Habit</th>
                            <th className={cx("smaller-column")}>Priority</th>
                            <th className={cx("medium-column")}>Created at</th>
                            <th className={cx("medium-column")}>
                                Last activated at
                            </th>
                            <th className={cx("smaller-column")}>Status</th>
                        </tr>
                    </thead>
                    <tbody>{inactivatedHabitsRows}</tbody>
                </Table>
            </div>
        </div>
    );
}

export default HabitManager;
