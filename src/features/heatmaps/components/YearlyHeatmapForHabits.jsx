import { useState, useEffect } from 'react';
import { checkForCurrentStreak, checkForLongestStreakv2 } from '../functions/Streaks';

const YearlyHeatmapForHabits = (props) => {
    const selectedDate = props.selectedDate;
    const setSelectedDate = props.setSelectedDate;

    const currentHabit = props.currentHabit;
    const [currHabitDatesCompleted, setCurrHabitsDateCompleted] = useState([]);

    const [heatmapYear, setHeatmapYear] = useState(new Date().getFullYear());
    const [allHeatmapDates, setAllHeatmapDates] = useState([]);

    useEffect(() => {
        // console.log(currentHabit);
        // console.log(currentHabit.habitDatesCompleted || []);

        let datesCompleted = [];
        datesCompleted = currentHabit?.habitDatesCompleted?.map(object => object.date) || [];
        
        setCurrHabitsDateCompleted(datesCompleted);
    }, [currentHabit])

    useEffect(() => {
        const startDate = new Date(heatmapYear, 0, 1);
        const dates = []

        for (let date = new Date(startDate); date.getFullYear() === heatmapYear; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }

        setAllHeatmapDates(dates);
    }, [heatmapYear]);

    // const [currentStreak, setCurrentStreak] = useState(0);
    // const [longestStreak, setLongestStreak] = useState(0);
    // const [currentStreakStartingDate, setCurrentStreakStartingDate] = useState(null);
    // const [longestStreakStartingDate, setLongestStreakStartingDate] = useState(null);


    // useEffect(() => {
    //     if (habits === null) {
    //         // console.log("No habits here...");
    //         return;
    //     }

    //     const relevantHabit = habits.find(habit => habit.id === Number(habitId));
    //     const relevantHabitDatesCompleted = relevantHabit?.habitDatesCompleted.map(date => new Date(date.date));
        
    //     // console.log(relevantHabit.habitDatesCompleted); 

    //     setCompletedDates([]);
    //     setCurrentStreak(0);
    //     setLongestStreak(0);
    //     setCurrentStreakStartingDate(null);
    //     setLongestStreakStartingDate(null);

    //     if (relevantHabitDatesCompleted && relevantHabitDatesCompleted.length > 0) {
    //         setCompletedDates(relevantHabitDatesCompleted);
    //         const { currentStreak, currentStreakStartingDate } = checkForCurrentStreak(relevantHabitDatesCompleted, selectedDate);
    //         const { longestStreak, streakStartDate } = checkForLongestStreakv2(relevantHabitDatesCompleted);

    //         setCurrentStreak(currentStreak);
    //         setLongestStreak(longestStreak);
    //         setCurrentStreakStartingDate(currentStreakStartingDate);
    //         setLongestStreakStartingDate(streakStartDate);
    //     }
    // }, [habits, habitId]);

    return (
        <div className="self-center flex flex-col gap-4 border p-4 w-fit">
            <div className='flex justify-between gap-4'>
                <div className='flex gap-1'>
                    <button 
                        className="border px-2 py-[0.125rem] text-[0.875rem]" 
                        onClick={() => {
                            const tempDate = new Date(selectedDate);
                            tempDate.setHours(0, 0, 0, 0);
                            tempDate.setDate(tempDate.getDate() - 1);
                            // console.log(tempDate);
                            setSelectedDate(tempDate);
                        }}>{`<`}
                    </button>

                    <h1 className='min-w-[12rem] text-center'>Date: { selectedDate.toDateString() || "N/A"}</h1>

                    <button 
                        className="border px-2 py-[0.125rem] text-[0.875rem]" 
                        onClick={() => {
                            const tempDate = new Date(selectedDate);
                            tempDate.setHours(0, 0, 0, 0);
                            tempDate.setDate(tempDate.getDate() + 1);
                            // console.log(tempDate);
                            setSelectedDate(tempDate);
                        }}>{`>`}
                    </button>
                </div>
                
                <h1>Year: { heatmapYear || "YYYY" }</h1>

                <div className='flex gap-1'>
                    <button 
                        className="border px-2 py-[0.125rem] text-[0.875rem]" 
                        onClick={() => setHeatmapYear(prev => prev - 1)}>{`< ${heatmapYear - 1}`}
                    </button>

                    <button 
                        className="border px-2 text-[0.875rem]" 
                        onClick={() => setHeatmapYear(prev => prev + 1)}>{`${heatmapYear + 1}>`}
                    </button>

                    <button className="border px-2 text-[0.875rem] ml-2" 
                        onClick={() => { 
                            const tempDate = new Date();
                            tempDate.setHours(0, 0, 0, 0);
                            // console.log(tempDate);
                            setSelectedDate(tempDate);
                        }}
                        >{`${new Date().getFullYear()}`}
                    </button>
                </div>
            </div>
            
            <div 
                className="yearly-heatmap-container"
                // className=''
            >
                { 
                    new Date(heatmapYear, 0, 1).getDay() - 1 !== -1 && new Date(heatmapYear, 0, 1).getDay() - 1 !== 7 &&
                    Array( new Date(heatmapYear, 0, 1).getDay() - 1 ).fill().map((_, index) => {
                        return <div key={index} className="hidden-yearly-date-block p-[0.375rem] xl:p-[0.5625rem]"></div>
                    })
                }
                {
                    allHeatmapDates.map((date, index) => (
                        <div 
                            key={index} 
                            className="yearly-date-block relative p-[0.375rem] xl:p-[0.5625rem]" 

                            style={{
                                backgroundColor: 
                                currHabitDatesCompleted.includes(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10).replaceAll("-", "/")) && selectedDate.toDateString() === date.toDateString() ? "lightgreen"
                                : currHabitDatesCompleted.includes(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10).replaceAll("-", "/")) ? "lime"
                                : selectedDate.toDateString() === date.toDateString() ? "var(--black-90)"
                                : "var(--black-45)"
                            }}

                            onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
                            onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
                            onClick={() => { 
                                console.log(date); 
                                setSelectedDate(date);
                            }}
                        >
                            <span 
                                className="absolute hidden text-nowrap text-[0.875rem] top-[-2.25rem] left-[-3.25rem] z-10 px-2 py-1" 
                                style={{ backgroundColor: "var(--black-33)", color: "var(--white-241),", border: "1px solid white"  }}
                            >{date.toDateString()}</span>

                        </div>
                    ))
                }
            </div>
        </div>
        
        //     <div className="flex gap-4 justify-between">
        //         <p>Current Streak: {currentStreak}</p>
        //         <p>Start of Current Streak: { currentStreakStartingDate ? currentStreakStartingDate.toDateString() : "N/A"}</p>
        //         <p>Longest Streak: {longestStreak}</p>
        //         <p>Start of Longest Streak: {longestStreakStartingDate ? longestStreakStartingDate.toDateString() : "N/A"}</p>
        //     </div>
    );
};

export default YearlyHeatmapForHabits;