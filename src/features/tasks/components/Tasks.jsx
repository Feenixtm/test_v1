import React from 'react';
import { useState, useEffect, useRef } from 'react';
import AddTaskOverlay from './AddTaskOverlay';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);

    const mockTasks = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for Task 1',
            completed: false
        },
        { 
            id: 2,
            title: 'Task 2',
            description: 'Description for Task 2',
            completed: false
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            completed: false
        }
    ]

    useEffect(() => {
        setTasks(mockTasks);
    }, [])

    return (
        <div className="container p-4 rounded-[0.25rem] flex flex-col gap-4">

            <AddTaskOverlay 
                showOverlay={showOverlay} 
                setShowOverlay={setShowOverlay} 
                tasks={tasks}
                setTasks={setTasks} 
            
            />

            <h1 className="text-[1.5rem] font-semibold">Tasks</h1>

            <div>
                <h2>Incomplete Tasks</h2>      

                <div className="flex flex-wrap gap-4">
                    {
                        tasks.filter(task => task.completed === false).map(task => (
                            <div key={task.id} className="border px-4 py-2 rounded w-fit">
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <p>{task.description}</p>
                                <span>{task.completed ? 'Completed' : 'Not Completed'}</span>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div>
                <h2>Completed Tasks</h2>

                <div className="flex flex-wrap gap-4">
                    {
                        tasks.filter(task => task.completed === true).map(task => (
                            <div key={task.id} className="border px-4 py-2 rounded w-fit">
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <p>{task.description}</p>
                                <span>{task.completed ? 'Completed' : 'Not Completed'}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button className="border px-2 py-1 w-fit" onClick={() => setShowOverlay(true)}>Add a task</button>
        </div>
    );
};

export default Tasks;
