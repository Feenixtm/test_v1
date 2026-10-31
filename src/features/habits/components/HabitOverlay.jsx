import { useState, useEffect } from 'react';

const HabitOverlay = (props) => {
  const accessToken = props.accessToken;

  const showOverlay = props.showOverlay;
  const setShowOverlay = props.setShowOverlay;
  const createOrEditMode = props.createOrEditMode;
  const setCreateOrEditMode = props.setCreateOrEditMode;

  const userHabits = props.userHabits;
  const setUserHabits = props.setUserHabits;
  const currentHabit = props.currentHabit;
  const setCurrentHabit = props.setCurrentHabit;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentHabit.name || "");
    setDescription(currentHabit.description || "");
  }, [currentHabit])

  useEffect(() => {
    if (createOrEditMode === "Create") {
      setName("");
      setDescription("");
    }
  }, [createOrEditMode])

  async function createHabit () {
    if (name.trim() === "") {
      console.log("This Habit has no name. Abandoning habit creation...");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/habits/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${ accessToken }`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          name,
          description,
        })
      });

      if (!response.ok) {
        throw new Erorr("Couldn't create a new habit:", response.status);
      }

      const data = await response.json();
      console.log(data);

      setUserHabits([...userHabits, data.createdHabit]);
      setShowOverlay(false);
      alert("Habit successfully created!");

    } catch (error) {
      console.error("Error creating habit: ", error);
    }
  }

  async function editHabit () {
    try {
      const response = await fetch(`http://localhost:5050/habits/${ currentHabit.id }`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${ accessToken }`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          name,
          description
        })
      });

      if (!response.ok) {
        throw new Error("Couldn't edit habit: ", response.status);
      }

      const data = await response.json();
      console.log(data);

      setCurrentHabit(data.updatedHabit);
      setUserHabits(prev => prev.map(habit => habit.id === currentHabit.id ? data.updatedHabit : habit));
      setShowOverlay(false);
      alert("Habit successfully edited!");
      
    } catch (error) {
      console.error("Error creating habit: ", error);
    }
  }

  return (
    <div
      className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center dark-transparent-bg z-20"
      onClick={() => { setShowOverlay(false) }}
    >

      <div className="relative bg-blue-800 p-4 rounded  w-full min-w-[325px] max-w-[475px]" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-[0.5rem] right-[0.5rem] text-[1rem] font-bold px-1" onClick={() => { setShowOverlay(false) }} type="button">X</button>

        <h1 className="text-[1.25rem] font-semibold">{createOrEditMode} Habit</h1>
        <form className="flex flex-col gap-2">
          <label>Title:</label>
          <input className="border p-2 rounded" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>

          <label>Description:</label>
          <textarea 
            className="border p-2 rounded" 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
          ></textarea>

          <button
            className="border px-2 py-1 w-fit self-end text-[0.875rem]"
            type="button"
            onClick={(e) => {
              if (createOrEditMode === "Create") {
                createHabit();
              } else {
                editHabit();
              }
            }}
          >{createOrEditMode === "Create" ? "Create New Habit" : "Save"}</button>
        </form>
      </div>

    </div>
  );
};

export default HabitOverlay;