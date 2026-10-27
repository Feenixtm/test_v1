import { useState, useEffect, useRef } from 'react';
import TaskOverlay from './TaskOverlay';
import YearlyHeatmapForTasks from '../../heatmaps/components/YearlyHeatmapForTasks';
import MonthlyHeatmapForTasks from '../../heatmaps/components/MonthlyHeatmapForTasks';

const Tasks = (props) => {
  const accessToken = props.accessToken;
  const userTasks = props.userTasks;
  const setUserTasks = props.setUserTasks;

  const [currentTask, setCurrentTask] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [createOrEditMode, setCreateOrEditMode] = useState('Create'); // 'Create' or 'Edit'

  const [date, setDate] = useState(new Date());

  const taskCategories = [
    {
      name: "Tasks Due Today",
      relevantTasks: userTasks.filter(task => task?.dueDate === date.toISOString().split('T')[0] && task.dateDone === null) ?? []
    },
    {
      name: "Tasks Completed Today",
      relevantTasks: userTasks.filter(task => task?.dateDone === date.toISOString().split('T')[0]) ?? []
    },
    {
      name: "Other Incomplete Tasks",
      relevantTasks: userTasks.filter(task => task?.dueDate !== date.toISOString().split('T')[0] &&  task.dateDone === null) ?? []
    },
    {
      name: "Other Completed Tasks",
      relevantTasks: userTasks.filter(task => task?.dateDone !== date.toISOString().split('T')[0] && task.dateDone !== null) ?? []
    },
  ]

  // Collapse Divs

  const collapseParentElement = (e, totalTasks) => {

    if (totalTasks < 1) {
      // console.log("Nothing there. Collapsing denied...");
      return;
    }

    if (e.currentTarget.parentElement.style.maxHeight !== "48px") {
      e.currentTarget.parentElement.style.maxHeight = "48px"
    } else if (e.currentTarget.parentElement.style.maxHeight === "48px") {
      e.currentTarget.parentElement.style.maxHeight = "100%"
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-[880px] lg:max-w-[1031px]">

      {
        showOverlay === true && 

        <TaskOverlay
          setShowOverlay={setShowOverlay}
          createOrEditMode={createOrEditMode}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}

          userTasks={userTasks}
          setUserTasks={setUserTasks}

          accessToken={accessToken}
        />
      }

      <MonthlyHeatmapForTasks
        date={ date }
        setDate={ setDate } 
        currentTask={ currentTask }
        dateDone={ currentTask?.dateDone || null }
        dueDate={ currentTask?.dueDate || null} 
      />
      
      {/* <YearlyHeatmapForTasks
        date={ date }
        setDate={ setDate } 
        currentTask={ currentTask }
        dateDone={ currentTask?.dateDone || null }
        dueDate={ currentTask?.dueDate || null} 
      /> */}

      <div className="flex justify-between items-center p-4 rounded-[0.25rem] bg-[var(--black-33)]">
        <p>SELECTED TASK: <span className="font-semibold">{ currentTask?.title || "N/A" }</span></p>

        <div className="flex gap-8">
          <span>Due: { currentTask?.dueDate || "N/A" }</span>
          <span>Completed: { currentTask?.dateDone || "N/A" }</span>
        </div>
        <button className="px-2 py-[0.125rem] h-fit border text-[0.875rem]" onClick={() => { setCreateOrEditMode("Edit"); setShowOverlay(true) }}>Edit Task</button>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-[0.25rem] bg-[var(--black-33)]">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.5rem] font-semibold">All Tasks</h1>
          <button className="px-2 py-[0.125rem] border text-[0.875rem] h-fit"  onClick={() => { setCreateOrEditMode("Create"); setShowOverlay(true) }}>Create New Task</button>
        </div>
        

        <div className='flex flex-col gap-2'>
          {
            taskCategories.map((category, index) => {
              return (
                <div 
                  className="overflow-hidden flex flex-col gap-4 pb-4 bg-[var(--black-15)]"
                  style={{ maxHeight: '48px' }}
                  key={ category.title }
                >
                  <div 
                    className='flex justify-between items-center h-[3rem] px-4 py-4 border bg-[var(--black-45)] hover:bg-[var(--black-90)]' 
                    onClick={(e) => { collapseParentElement(e, category.relevantTasks.length) }}
                  >
                    <h2 className="text-[1.125rem] font-bold cursor-pointer">{ category.name } {`(${category.relevantTasks.length > 0 ? category.relevantTasks.length : 0 })`}</h2>
                  </div>

                  <div className="flex gap-4 flex-wrap px-4">
                    {
                      (category.relevantTasks && category.relevantTasks.length >= 1) && category.relevantTasks.map((task, index) => {
                        return (
                          <div 
                            key={task.id} 
                            className={`flex flex-col border px-2 py-1 rounded w-fit cursor-pointer hover:bg-[var(--black-45)]`}
                            onClick={() => { console.log(task); setCurrentTask(task) }}
                          >
                            <h2 className="">{task.title}</h2>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Tasks;
