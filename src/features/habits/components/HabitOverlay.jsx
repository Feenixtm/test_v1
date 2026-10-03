import React from 'react';
import { useState, useEffect, useRef } from 'react';

const HabitOverlay = (props) => {
        const overlayType = props.overlayType;
        const setOverlayType = props.setOverlayType;
        const habits = props.habits;
        const setHabits = props.setHabits;

        const habitId = props.habitId;
        const setHabitId = props.setHabitId;

        const [name, setName] = useState('');
        const [description, setDescription] = useState('');

        const overlayRef = useRef();

        const handleAddHabit = (e) => {

            const newHabit = {
                id: habits.length + 1,
                name,
                description,
                datesDone: []
            }

            setHabits([...habits, newHabit]);
            hideOverlay();
        }

        const handleEditHabit = (e) => {
            const habitsCopy = [...habits];
            const habitCopy = habitsCopy.find(habit => habit.id === Number(habitId));

            const updatedHabit = {
                id: Number(habitId),
                name,
                description,
                datesDone: [...habitCopy.datesDone]
            }

            console.log(habitsCopy);
            console.log(updatedHabit);

            const habitIndex = habitsCopy.findIndex(habit => habit.id === Number(habitId));
            habitsCopy[habitIndex] = updatedHabit;

            setHabits([...habitsCopy]);
            hideOverlay();
        }

        const hideOverlay = () => {
            if (overlayRef.current.style.display === "" || overlayRef.current.style.display === "flex") {
                overlayRef.current.style.display = 'none';
            }

            setOverlayType("None");
            setName('');
            setDescription('');
            // console.log(overlayRef.current.style);
        }

        useEffect(() => {
            if (overlayType === "Create") {
                setName('');
                setDescription('');
            } else if (overlayType === "Edit" && habits) {
                const habit = habits.find(habit => habit.id === Number(habitId));
                setName(habit.name);
                setDescription(habit.description);
            }
        }, [overlayType, habitId]);

    return (
        <div 
            ref={overlayRef}  
            style={{ display: overlayType !== "None" ? 'flex' : 'none' }}
            className="absolute hidden top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center dark-transparent-bg z-20" 
            onClick={() => hideOverlay()}
        >

            <div className="relative bg-blue-800 p-4 rounded  w-full min-w-[325px] max-w-[475px]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-[0.5rem] right-[0.5rem] text-[1rem] font-bold px-1" onClick={() => hideOverlay()} type="button">X</button>

                <h1 className="text-[1.25rem] font-semibold">{ overlayType === "Create" ? "Create" : "Edit" } Habit</h1>
                <form className="flex flex-col gap-2">
                    <label>Title:</label>
                    <input className="border p-2 rounded" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    
                    <label>Description:</label>    
                    <textarea className="border p-2 rounded" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    
                    <button 
                        className="border px-2 py-1 w-fit self-end text-[0.875rem]" 
                        type="button" 
                        onClick={(e) => {
                            if (overlayType === "Create") {
                                handleAddHabit(e);
                            } else {
                                handleEditHabit(e);
                            }
                        }}
                    >{ overlayType === "Create" ? "Add Habit" : "Save" }</button>
                </form>
            </div>

        </div>
    );
};

export default HabitOverlay;