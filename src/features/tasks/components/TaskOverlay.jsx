import React from 'react';
import { useState, useRef, useEffect } from 'react';

const TaskOverlay = (props) => {
    const overlayType = props.overlayType;
    const setOverlayType = props.setOverlayType;

    const tasks = props.tasks;
    const setTasks = props.setTasks;

    const taskId = props.taskId;
    const setTaskId = props.setTaskId;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const overlayRef = useRef();

    const handleAddTask = (e) => {
        e.preventDefault();

        const newTask = {
            id: tasks.length + 1,
            title, 
            description,
            completed: false,
            dateCompleted: null
        }

        console.log(newTask);

        setTasks([...tasks, newTask]);
        hideOverlay();
    }

    const handleEditTask = (e) => {
        e.preventDefault();
        console.log("Editing...")

        const currentTask = tasks.find(task => task.id === taskId);

        const updatedTask = {
            id: taskId,
            title, 
            description,
            completed: currentTask.completed,
            dateCompleted: currentTask.dateCompleted,
        }

        console.log(updatedTask);

        const tasksCopy = [...tasks];
        const taskIndex = tasksCopy.findIndex(task => task.id === taskId);
        tasksCopy[taskIndex] = updatedTask;

        setTasks([...tasksCopy]);
        hideOverlay();
    }

    const hideOverlay = () => {
        if (overlayRef.current.style.display === "" || overlayRef.current.style.display === "flex") {
            overlayRef.current.style.display = 'none';
        }

        setOverlayType("None");
        setTitle('');
        setDescription('');
        // console.log(overlayRef.current.style);
    }

    useEffect(() => {
        if (taskId !== null) {
            const currentTask = tasks.find(task => task.id === taskId);
            setTitle(currentTask.title);
            setDescription(currentTask.description);
        } else if (taskId === null){
            setTitle('');
            setDescription('');
        }
    }, [overlayType, taskId]);

    return (
        <div 
            ref={overlayRef}  
            style={{ display: overlayType === "None" ? 'none': 'flex' }}
            className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center dark-transparent-bg" 
            onClick={() => hideOverlay()}
        >

            <div className="relative bg-blue-800 p-4 rounded  w-full min-w-[325px] max-w-[475px]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-[0.5rem] right-[0.5rem] text-[1rem] font-bold px-1" onClick={() => hideOverlay()} type="button">X</button>

                <h1 className="text-[1.25rem] font-semibold">{ overlayType } Task</h1>
                <form className="flex flex-col gap-2">
                    <label>Title:</label>
                    <input className="border p-2 rounded" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    
                    <label>Description:</label>    
                    <textarea className="border p-2 rounded" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    
                    <button 
                        className="border px-2 py-1 w-fit self-end text-[0.875rem]" 
                        type="button" 
                        onClick={(e) => {
                            if (overlayType === "Create") {
                                handleAddTask(e);
                            } else if (overlayType === "Edit") {
                                handleEditTask(e);
                            }
                        }}
                    >{ overlayType === "Create" ? "Add Task" : "Save" }</button>
                </form>
            </div>

        </div>
    );
};

export default TaskOverlay;