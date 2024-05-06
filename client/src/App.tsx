import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
    HabitManager,
    CreateHabitBox,
    DailyRecordBox,
    WeekRecordBox,
} from "~/components";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
    return (
        <div className="App">
            <Routes>
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
