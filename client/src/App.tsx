import React from "react";
import "./App.css";
import { HabitsManager, CreateHabitBox } from "~/components";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
    return (
        <div className="App">
            <DefaultLayout>
                {/* <HabitsManager /> */}
                <CreateHabitBox />
            </DefaultLayout>
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
