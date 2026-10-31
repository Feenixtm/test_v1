import { useState, useEffect } from 'react';

const TaskOverlay = (props) => {
  // Props v.2
  const accessToken = props.accessToken;

  const userTasks = props.userTasks;
  const setUserTasks = props.setUserTasks;
  const currentTask = props.currentTask;
  const setCurrentTask = props.setCurrentTask;

  const setShowOverlay = props.setShowOverlay;
  const createOrEditMode = props.createOrEditMode;

  const showDeleteOverlay = props.showDeleteOverlay;
  const setShowDeleteOverlay = props.setShowDeleteOverlay;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [dateDone, setDateDone] = useState("");

  // ------------------------------
  // --- Initialize Form Fields --- WIP
  // ------------------------------

  useEffect(() => {
    // console.log(currentTask);
    

    if (currentTask!== null) {

      console.log("Date Done:", currentTask.dateDone);
      console.log("Date Due:", currentTask.dueDate);

      const reformattedDateDone = currentTask.dateDone !== null ? currentTask.dateDone.replaceAll("/", "-") : "";
      const reformattedDueDate = currentTask.dueDate !== null ? currentTask.dueDate.replaceAll("/", "-") : "";

      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setIsDone(currentTask.isDone);
      setDateDone(reformattedDateDone);
      setDueDate(reformattedDueDate);

    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setDateDone("");
      setIsDone(false);
    }
    
  }, [currentTask])

  // ------------------------------------------------------------
  // --- Update input fields depending on Create or Edit mode --- WIP
  // ------------------------------------------------------------

  useEffect(() => {
    if (createOrEditMode === "Create") {
      setTitle("");
      setDescription("");
      setDueDate("");
      setDateDone("");
      setIsDone(false);
    } else if (createOrEditMode === "Edit") {
      const reformattedDateDone = currentTask.dateDone !== null ? currentTask.dateDone.replaceAll("/", "-") : "";
      const reformattedDueDate = currentTask.dueDate !== null ? currentTask.dueDate.replaceAll("/", "-") : "";

      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setIsDone(currentTask.isDone);
      setDateDone(reformattedDateDone);
      setDueDate(reformattedDueDate);
    }
  }, [createOrEditMode])

  // ----------------------
  // --- Create Task v2 --- Looks good?
  // ----------------------

  async function createTask() {
    try {
      // console.log("Creating task...");

      const response = await fetch('http://localhost:5050/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          isDone: false,
          dateDone: null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      // console.log(data);
      
      setUserTasks([...userTasks, data.task]);
      setShowOverlay(false);
      alert("Task created successfully!");

    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  // ----------------------
  // --- Update Task v2 ---  Look good?
  // ----------------------

  async function updateTask() {
    try {
      // console.log("Updating task...");

      const response = await fetch(`http://localhost:5050/tasks/${currentTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          isDone: dateDone !== null && dateDone.trim() !== "" ? true : false,
          dateDone: dateDone.trim() !== "" ? dateDone : null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      // console.log(data);

      setUserTasks(userTasks.map(task => task.id === currentTask.id ? data.task : task));
      setShowOverlay(false);
      alert("Task updated successfully!");

      } catch (error) {
        console.error('Error updating task:', error);
      }
    }

    return (
      <div 
        className="fixed top-0 left-0 w-[100vw] h-full flex justify-center items-center dark-transparent-bg z-20"
        onClick={() => { setShowOverlay(false); }}
      >

        <div 
          className="relative bg-blue-800 p-4 rounded w-full min-w-[325px] max-w-[640px] m-8 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-[1.25rem] font-semibold mb-4">{createOrEditMode} Task</h2>
          <button className="absolute top-0 right-0 rounded-r-[0.25rem] px-4 py-2" onClick={() => {setShowOverlay(false)}}>X</button>

          <form className="flex flex-col gap-2">
            <label>Title:</label>
            <input className="border p-2 rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

            <label>Description:</label>
            <textarea className="border p-2 rounded" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <div className="flex gap-4 w-full">
              <div className='flex flex-col w-full'>
                <label>Due Date:</label>
                <input type='date' className='w-full border px-2 py-1 rounded' value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
              </div>

              <div className="flex flex-col w-full">
                <label>Date Completed:</label>
                <input type='date' className='w-full border px-2 py-1 rounded' value={dateDone} onChange={(e) => setDateDone(e.target.value)}></input>
              </div>
            </div>

            <div className="flex" style={{ justifyContent: createOrEditMode === "Create" ? "end" : "space-between" }}>
              {
                createOrEditMode === "Edit" && 
                <button 
                  className="border px-2 py-1" 
                  style={{ color: "red" }}
                  type='button'
                  onClick={() => setShowDeleteOverlay(true)}
                >Delete</button>
              }
              <button 
                className="border px-2 py-1" 
                type="button" 
                onClick={() => {
                  if (createOrEditMode === "Create") {
                    createTask();
                  } else if (createOrEditMode === "Edit") {
                    updateTask();
                  }
                }}>{ createOrEditMode === "Create" ? "Add Task" : "Save" }</button>
            </div>
          </form> 
        </div>

      </div>
      // <input type="date" className="border p-2 rounded w-full" name="dueDate" value={`${dueDate ? dueDate.replaceAll("/", "-") : ""}`} onChange={(e) => {setDueDate(e.target.value); console.log(e.target.value)}} />
      // <input type="date" className="border p-2 rounded w-full" name="dateDone" value={`${dateDone ? dateDone.replaceAll("/", "-") : ""}`} onChange={(e) => {setDateDone(e.target.value); console.log(e.target.value)}} />
    );
  };
  
export default TaskOverlay;