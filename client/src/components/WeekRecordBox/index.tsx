import React, { useState, useEffect } from "react";
import {
    getStyle,
    getDateString,
    getWeekDates,
    getDateStringByDate,
    getShortWeekdayString,
} from "~/utils";
import styles from "./WeekRecordBox.module.scss";
import { Habit, Record, DailyRecordMap, WeekRecordMap } from "~/types";
import { Table } from "react-bootstrap";
import { dataQuery } from "~/services";
import { useParams } from "react-router-dom";

const cx = getStyle(styles);

function WeekRecordBox() {
    const { year, month, day } = useParams();
    const [habits, setHabits] = useState<Habit[]>([]);
    const [weekRecordMap, setWeekRecordMap] = useState<WeekRecordMap>({});
    const [weekDates, setWeekDates] = useState<Date[]>([]);
    // const [recordMap, setRecordMap] = useState;

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

    // Get WEEK's record
    useEffect(() => {
        const weekDates = getWeekDates(
            new Date(getDateString(year, month, day))
        );
        setWeekDates(weekDates);

        async function fetchData() {
            const weekRecordMap: WeekRecordMap = {};
            for (const date of weekDates) {
                const dateString = getDateStringByDate(date);
                const query = `
                findManyRecords(filter: { date: "${dateString}" }) {
                    id
                    habit {
                      id
                    }
                }
                `;

                const records = await dataQuery<Record[]>(
                    query,
                    "findManyRecords"
                );
                const dailyRecordMap: DailyRecordMap = {};
                for (const record of records) {
                    dailyRecordMap[record.habit.id] = record.id;
                }
                weekRecordMap[dateString] = dailyRecordMap;
            }
            setWeekRecordMap(weekRecordMap);
        }

        fetchData();
    }, [year, month, day]);

    return (
        <div className={cx("container")}>
            <h1 className={cx("title")}>
                {weekDates.length == 0
                    ? ""
                    : `${getDateStringByDate(
                          weekDates[0]
                      )} - ${getDateStringByDate(weekDates[6])}`}
            </h1>
            <div className={cx("table")}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className={cx("index-column")}>#</th>
                            <th>Habit</th>
                            {weekDates.map(date => (
                                <th
                                    key={date.getDate()}
                                    className={cx("week-column")}
                                >
                                    {`${getShortWeekdayString(date.getDay())} ${
                                        date.getDate() < 10 ? "0" : ""
                                    }${date.getDate()}`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{habit.content}</td>
                                    {weekDates.map(date => {
                                        const dateString =
                                            getDateStringByDate(date);
                                        const complete =
                                            !!weekRecordMap[dateString] &&
                                            !!weekRecordMap[dateString][
                                                habit.id
                                            ];
                                        return (
                                            <td
                                                key={date.getDay()}
                                                className={cx(
                                                    complete ? "complete" : ""
                                                )}
                                            ></td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default WeekRecordBox;
