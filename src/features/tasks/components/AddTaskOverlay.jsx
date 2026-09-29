import React from 'react';
import { useState, useRef } from 'react';

const AddTaskOverlay = (props) => {
    const showOverlay = props.showOverlay;
    const setShowOverlay = props.setShowOverlay;
    const tasks = props.tasks;
    const setTasks = props.setTasks;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const overlayRef = useRef();

    const handleAddTask = (e) => {
        e.preventDefault();

        const newTask = {
            id: tasks.length + 1,
            title, 
            description,
            completed: false
        }

        console.log(newTask);

        setTasks([...tasks, newTask]);
        hideOverlay();
    }

    const hideOverlay = () => {
        if (overlayRef.current.style.display === "" || overlayRef.current.style.display === "flex") {
            overlayRef.current.style.display = 'none';
        }

        setShowOverlay(false);
        console.log(overlayRef.current.style);
    }

    return (
        <div 
            ref={overlayRef}  
            style={{ display: showOverlay ? 'flex' : 'none' }}
            className="absolute hidden top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center dark-transparent-bg" 
            onClick={() => hideOverlay()}
        >

            <div className="relative bg-blue-800 p-4 rounded  w-full min-w-[325px] max-w-[475px]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-[0.5rem] right-[0.5rem] text-[1rem] font-bold px-1" onClick={() => hideOverlay()} type="button">X</button>

                <h1 className="text-[1.25rem] font-semibold">Add Task</h1>
                <form className="flex flex-col gap-2">
                    <label>Title:</label>
                    <input className="border p-2 rounded" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    
                    <label>Description:</label>    
                    <textarea className="border p-2 rounded" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    
                    <button className="border px-2 py-1 w-fit self-end text-[0.875rem]" type="button" onClick={(e) => handleAddTask(e)}>Add Task</button>
                </form>
            </div>

        </div>
    );
};

export default AddTaskOverlay;