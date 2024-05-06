import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
    HabitManager,
    CreateHabitBox,
    DailyRecordBox,
    WeekRecordBox,
    DayRedirect,
    WeekRedirect,
} from "~/components";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DayRedirect />} />
                <Route path="/day" element={<DayRedirect />} />
                <Route path="/week" element={<WeekRedirect />} />

                <Route
                    path="/create"
                    element={
                        <DefaultLayout>
                            <CreateHabitBox />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/day/:year/:month/:day"
                    element={
                        <DefaultLayout>
                            <DailyRecordBox />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/week/:year/:month/:day"
                    element={
                        <DefaultLayout>
                            <WeekRecordBox />
                        </DefaultLayout>
                    }
                />

                <Route
                    path="/manager"
                    element={
                        <DefaultLayout>
                            <HabitManager />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </div>
    );
}

// year/month/day
// week/year/month/day
// month/year/month
// year/year
// habit
//     - Active
//     - Unactive
export default App;
