import React from 'react';
import { useState, useEffect, useRef } from 'react';
import TaskOverlay from './TaskOverlay';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState(null);

    const [overlayType, setOverlayType] = useState('None');
    
    const mockTasks = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for Task 1',
            completed: false,
            dateCompleted: null
        },
        { 
            id: 2,
            title: 'Task 2',
            description: 'Description for Task 2',
            completed: false,
            dateCompleted: null,
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            completed: false,
            dateCompleted: null,
        }
    ]

    const taskType = [
        {
            completionType: "Incomplete",
            isCompleted: false,
        },
        {
            completionType: "Completed",
            isCompleted: true,
        }
    ]

    useEffect(() => {
        setTasks(mockTasks);
    }, [])

    return (
        <div className="container p-4 rounded-[0.25rem] flex flex-col gap-4">

            <TaskOverlay 
                overlayType={overlayType}
                setOverlayType={setOverlayType}
                tasks={tasks}
                setTasks={setTasks} 
                taskId={taskId}
                setTaskId={setTaskId}
            />

            <h1 className="text-[1.5rem] font-semibold">Tasks</h1>

            { 
                taskType.map(type => (
                    <div>
                        <h2>{ type.completionType } Tasks</h2>

                        <div className="flex flex-wrap gap-4">
                            {
                                tasks.filter(task => task.completed === type.isCompleted).sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted)).map(task => (
                                    <div key={task.id} className="flex flex-col border px-4 py-2 rounded w-fit">
                                        <h2 className="text-lg font-semibold">{task.title}</h2>
                                        <p>{task.description}</p>
                                        <div className="flex items-center gap-2">
                                            <span>{task.dateCompleted !== null ? task.dateCompleted : 'In progress'}</span>
                                            <input type="checkbox" checked={task.completed} onChange={() => {
                                                const allTasksCopy = [...tasks];
                                                const taskIndex = task.id - 1;
                                                allTasksCopy[taskIndex].completed = !allTasksCopy[taskIndex].completed;

                                                if (!allTasksCopy[taskIndex].completed === true) {
                                                    allTasksCopy[taskIndex].dateCompleted = null;
                                                } else if (!allTasksCopy[taskIndex].completed === false) {
                                                    allTasksCopy[taskIndex].dateCompleted = `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`;
                                                }
                                                
                                                setTasks(allTasksCopy);
                                            }}></input>
                                        </div>
                                        <button className="border px-2 w-fit self-end mt-2 text-[0.875rem]" type="button" onClick={() => { setOverlayType("Edit"), setTaskId(task.id); console.log(task.id) }}>Edit</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            <button className="border px-2 py-1 w-fit" onClick={() => { setOverlayType("Create"), setTaskId(null) }}>Create a task</button>
        </div>
    );
};

export default Tasks;
