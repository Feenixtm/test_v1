import React from 'react';
import { useState, useEffect } from 'react';
import YearlyHeatmap from '../../heatmaps/components/YearlyHeatmap';
import HabitOverlay from './HabitOverlay';

const Habits = () => {
    const [habits, setHabits] = useState(null);
    const [habitId, setHabitId] = useState(null);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [overlayType, setOverlayType] = useState("None");

    const mockHabits = [
        { 
            id: 1, 
            name: 'Drink Protein Shake',
            description: 'Description for Drink Protein Shake',
            datesDone: [ "Thu Oct 01 2026" ]
        },
        { 
            id: 2, 
            name: 'Coding hour',
            description: 'Description for Coding hour: Spend an hour coding every day.',
            datesDone: [ "Fri Oct 02 2026" ]
        },
    ]

    const handleMarkAsComplete = (habitId) => {
        // console.log(habitId);
        const habitsCopy = [...habits];
        // console.log(habitsCopy);
        // console.log(habitsCopy.find(habit => habit.id === Number(habitId)));
        habitsCopy.find(habit => habit.id === Number(habitId))?.datesDone.push(selectedDate.toDateString());
        setHabits([...habitsCopy]);
    };

    const handleMarkAsIncomplete = (habitId) => {
        const habitsCopy = [...habits];
        const updatedDates = habitsCopy.find(habit => habit.id === Number(habitId)).datesDone.filter(date => date !== selectedDate.toDateString());
        habitsCopy.find(habit => habit.id === Number(habitId)).datesDone = updatedDates;
        setHabits([...habitsCopy]);
    };

    useEffect(() => {
        setHabits(mockHabits);
        setHabitId(1);
    }, [])

    return (
        <div className="flex flex-col gap-4">

            <HabitOverlay 
                overlayType={overlayType} 
                setOverlayType={setOverlayType} 
                habits={habits}
                setHabits={setHabits}
                habitId={habitId}
                setHabitId={setHabitId} 
            />

            <h1 className="text-[1.5rem] font-semibold">My Habits</h1>

            <YearlyHeatmap habits={ habits } habitId={ habitId } setHabitId={ setHabitId } selectedDate={ selectedDate } setSelectedDate={ setSelectedDate }/>

            <p>{ habits && habits.find(habit => habit.id === Number(habitId))?.description }</p>

            {/* <div className="flex flex-wrap gap-4">
                {
                    habits !== null && habits.map(habit => (
                        <div key={habit.id} className="flex flex-col gap-2">
                            <span>{habit.name}</span>

                            {
                                habit.datesDone.find(date => date === selectedDate.toDateString()) &&
                                <button 
                                    className="border py-1 px-2 text-[0.75rem]"
                                    onClick={() => handleMarkAsIncomplete(habit.id)}
                                    type="button"
                                >Mark as Incomplete for Today</button>
                            }

                            {
                                !habit.datesDone.find(date => date === selectedDate.toDateString()) &&
                                <button 
                                    className="border py-1 px-2 text-[0.75rem]"
                                    onClick={() => handleMarkAsComplete(habit.id)}
                                    type="button"
                                >Mark as Complete for Today</button>
                            }
                        </div>
                    ))
                }
            </div> */}

            <div className="flex justify-between">

                <div>
                    {
                        habits !== null && habits.find(habit => habit.id === Number(habitId))?.datesDone.find(date => date === selectedDate.toDateString()) &&
                        <button 
                            className="border py-1 px-2 text-[0.75rem]"
                            onClick={() => handleMarkAsIncomplete(habitId)}
                            type="button"
                        >Mark as Incomplete for Today</button>
                    }

                    {
                        habits !== null && !habits.find(habit => habit.id === Number(habitId))?.datesDone.find(date => date === selectedDate.toDateString()) &&
                        <button 
                            className="border py-1 px-2 text-[0.75rem]"
                            onClick={() => handleMarkAsComplete(habitId)}
                            type="button"
                        >Mark as Complete for Today</button>
                    }
                </div>
                
                <button className="border py-1 px-2 text-[0.75rem]" onClick={() => setOverlayType("Edit")}>Edit Habit</button>

            </div>
            
            <hr></hr>

            <div className="flex justify-end">
                <button className="border px-2 py-1" onClick={() => setOverlayType("Create")}>Create a Habit</button>
            </div>

        </div>
    );
};

export default Habits;