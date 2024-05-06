import React from "react";
import "./App.css";
import { HabitsManager, CreateHabitBox } from "~/components";
import DefaultLayout from "~/layouts/DefaultLayout";
import DailyRecordBox from "./components/DailyRecordBox";
import { Routes, Route, Link } from "react-router-dom";

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
                <Route path="/day" element={<DailyRecordBox />} />
                <Route path="/manager" element={<CreateHabitBox />} />
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
