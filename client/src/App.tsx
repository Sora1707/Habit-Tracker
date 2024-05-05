import React from "react";
import "./App.css";
import HabitBox from "~/components/HabitsManager";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
    return (
        <div className="App">
            <DefaultLayout>
                <HabitBox />
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
