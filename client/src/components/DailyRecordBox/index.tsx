import React, { useState, useEffect, JSX, useMemo } from "react";
import {
    getStyle,
    getDateString,
    getFormattedDateString,
    getDateStringByDate,
} from "~/utils";
import styles from "./DailyRecordBox.module.scss";
import { Habit, habitCompare, Record, DailyRecordMap } from "~/types";
import { Table } from "react-bootstrap";
import SwitchButton from "../SwitchButton";
import { dataMutation, dataQuery } from "~/services";
import { useParams } from "react-router-dom";

const cx = getStyle(styles);

function DailyRecordBox() {
    const { year, month, day } = useParams();
    const [habits, setHabits] = useState<Habit[]>([]);
    // recordMap: habit -> record
    const [dailyRecordMap, setRecordMap] = useState<DailyRecordMap>({});

    const today = useMemo(() => new Date(), []);

    // Get ACTIVE habits
    useEffect(() => {
        const query = `
        findManyHabits(filter: { isActivated: true }) {
            id,
            content,
            color,
            priority,
            isActivated
        }
        `;
        dataQuery(query, "findManyHabits").then(
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

    // Get TODAY's record
    useEffect(() => {
        const query = `
        findManyRecords(filter: { date: "${getDateString(
            year,
            month,
            day
        )}" }) {
            id
            habit {
              id
            }
        }
        `;
        dataQuery(query, "findManyRecords").then((records: Record[]) => {
            const dailyRecordMap: DailyRecordMap = {};
            for (const record of records) {
                dailyRecordMap[record.habit.id] = record.id;
            }
            setRecordMap(dailyRecordMap);
        });
    }, [year, month, day]);

    async function toggleHabitCompletion(index: number) {
        const habit = habits[index];
        const recordId = dailyRecordMap[habit.id];
        // Complete -> Delete
        if (recordId) {
            const query = `
            deleteRecordById(id: "${recordId}")
            `;
            dataMutation(query, "deleteRecordById");
            delete dailyRecordMap[habit.id];
        }
        // Incomplete -> Create
        else {
            const query = `
            createRecord(habitId: "${habit.id}", date:"${getDateStringByDate(
                today
            )}") {
                id
                date
                habit {
                    id
                }
            }
            `;
            const newRecord = await dataMutation<Record>(query, "createRecord");
            dailyRecordMap[habit.id] = newRecord.id;
        }
        setRecordMap({ ...dailyRecordMap });
    }

    // If the date is not today, prevent update
    const disabled = !(
        parseInt(year) === today.getFullYear() &&
        parseInt(month) === today.getMonth() + 1 &&
        parseInt(day) === today.getDate()
    );

    // Divide into "Activated" and "Inactivated"
    const completeHabitsRows: JSX.Element[] = [];
    const incompleteHabitsRows: JSX.Element[] = [];
    habits.sort(habitCompare).forEach((habit, index) => {
        const rows = dailyRecordMap[habit.id]
            ? completeHabitsRows
            : incompleteHabitsRows;
        rows.push(
            <tr key={index}>
                <td>{rows.length + 1}</td>
                <td>{habit.content}</td>
                <td>
                    <SwitchButton
                        disabled={disabled}
                        checked={!!dailyRecordMap[habit.id]}
                        onChange={async () => {
                            await toggleHabitCompletion(index);
                        }}
                    />
                </td>
            </tr>
        );
    });

    return (
        <div className={cx("container")}>
            <h1 className={cx("title")}>
                {getFormattedDateString(new Date(`${year}/${month}/${day}`))}
            </h1>
            <div className={cx("activated-habits", "table")}>
                <h3>Complete Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx("index-column")}>#</th>
                            <th>Content</th>
                            <th className={cx("smaller-column")}>Status</th>
                        </tr>
                    </thead>
                    <tbody>{completeHabitsRows}</tbody>
                </Table>
            </div>
            <div className={cx("inactivated-habits", "table")}>
                <h3>Incomplete Habits</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx("index-column")}>#</th>
                            <th>Content</th>
                            <th className={cx("smaller-column")}>Status</th>
                        </tr>
                    </thead>
                    <tbody>{incompleteHabitsRows}</tbody>
                </Table>
            </div>
        </div>
    );
}

export default DailyRecordBox;
