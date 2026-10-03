
import React from 'react';
import { useState, useEffect } from 'react';

const YearlyHeatmap = (props) => {
    const { habits, habitId, setHabitId, selectedDate, setSelectedDate } = props;

    const [year, setYear] = useState(new Date().getFullYear());
    const [allViewableDates, setAllViewableDates] = useState([]);
    const [completedDates, setCompletedDates] = useState([]);

    useEffect(() => {
        if (habits !== null) {
            setCompletedDates([...habits.find(habit => habit.id === Number(habitId))?.datesDone]);
        }
    }, [habits, habitId]);

    const mockCompletedDates = [
        new Date(2026, 0, 1).toDateString(),
        new Date(2026, 0, 2).toDateString(),
        new Date(2026, 0, 4).toDateString(),   
    ]

    /*
        All viewable dates
        {
            year: 2026
            dates: []
        }
    */

    useEffect(() => {
        setYear(new Date().getFullYear());
    
        console.log(selectedDate);
        console.log(selectedDate.toDateString());
    }, []);

    useEffect(() => {
        const startDate = new Date(year, 0, 1);
        const dates = []

        for (let date = new Date(startDate); date.getFullYear() === year; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }
        setAllViewableDates(dates);
    }, [year]);

    return (
        <div className="flex flex-col gap-4 border p-4">
            {/* <span>Yearly Heatmap Component</span> */}

            <div className="flex justify-between">
                {/* <div>Current Habit: { habits.find(habit => habit.id === habitId)?.name }</div> */}
                
                <div>
                    <select onChange={(e) => { 
                        setHabitId(e.target.value); 
                        // console.log(e.target.value);
                        setSelectedDate(new Date());
                    }} value={habitId}>
                        {
                            habits !== null && habits.map(habit => (
                                <option key={habit.id} value={habit.id}>
                                    {habit.name}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <div>
                    {
                        selectedDate && <span>Selected Date: { selectedDate.toDateString() }</span>
                    }
                </div>

                <div className="flex gap-4 items-center">
                    <p>Year: {year}</p>
                    <div className="flex gap-1">
                        <button className="border px-2 py-[0.125rem] text-[0.875rem]" onClick={() => setYear(year - 1)}>{`<`}</button>
                        <button className="border px-2 text-[0.875rem]" onClick={() => {
                            setYear(new Date().getFullYear());
                            setSelectedDate(new Date());
                        }}>{`Today`}</button>
                        <button className="border px-2 text-[0.875rem]" onClick={() => setYear(year + 1)}>{`>`}</button>
                    </div>
                </div>
            </div>

            <div className="yearly-heatmap-container max-h-[6rem] xl:max-h-[8rem]">
                { 
                    new Date(year, 0, 1).getDay() - 1 !== -1 && new Date(year, 0, 1).getDay() - 1 !== 7 &&
                    Array( new Date(year, 0, 1).getDay() - 1 ).fill().map((_, index) => {
                        return <div key={index} className="hidden-yearly-date-block p-[0.375rem] xl:p-[0.5625rem]"></div>
                    })
                }
                {
                    allViewableDates.map((date, index) => (
                        <div 
                            key={index} 
                            className="yearly-date-block relative p-[0.375rem] xl:p-[0.5625rem]" 
                            style={{ backgroundColor: completedDates.includes(date.toDateString()) ? "green" : date.toDateString() === selectedDate.toDateString() ? "var(--black-90)" : "var(--black-45)" }}
                            onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
                            onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
                            onClick={() => { console.log(date.toDateString()); setSelectedDate(date); }}
                        >
                            <span className="absolute hidden text-nowrap text-[0.875rem] top-[-2.25rem] left-[-3.25rem] z-10 px-2 py-1" style={{ backgroundColor: "var(--black-33)", color: "var(--white-241),", border: "1px solid white"  }}>{date.toDateString()}</span>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
};

export default YearlyHeatmap;