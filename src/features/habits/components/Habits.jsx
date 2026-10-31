import { useState, useEffect } from 'react';
import YearlyHeatmapForHabits from '../../heatmaps/components/YearlyHeatmapForHabits';
import HabitOverlay from './HabitOverlay';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

const Habits = (props) => {
  const accessToken = props.accessToken;

  const userHabits = props.userHabits;
  const setUserHabits = props.setUserHabits;
  const [currentHabit, setCurrentHabit] = useState(userHabits[0] || {});

  const [showOverlay, setShowOverlay] = useState(false);
  const [createOrEditMode, setCreateOrEditMode] = useState("Create");
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  // From Heatmap
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --------------------------------------
  // UPDATE HABIT COMPLETIONS - Add Date
  // --------------------------------------

  async function markHabitAsComplete() {
    const tzOffset = selectedDate.getTimezoneOffset() * 60000

    try {
      // Sends a post request to create an item in habitDatesCompleted
      const response = await fetch (`http://localhost:5050/habits/datesCompleted/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${ accessToken }`,
          'Content-type': "Application/json"
        },
        body: JSON.stringify({
          date: new Date(selectedDate.getTime() - tzOffset).toISOString().slice(0, 10).replaceAll("-", "/"),
          habitId: currentHabit.id,
        })
      });

      if (!response.ok) {
        throw new Error(`Habit could not be marked as COMPLETE: `, response.status);
      }

      const data = await response.json();
      console.log(data);

      setCurrentHabit(prev => ({
        ...prev,
        habitDatesCompleted: [...prev.habitDatesCompleted, data.createdHabitDateCompleted]
      }));

      // Update userHabits to reflect changes in UI [ WORKS ]
      const currentHabitCopy = currentHabit;
      currentHabitCopy.habitDatesCompleted = [...currentHabitCopy.habitDatesCompleted, data.createdHabitDateCompleted];
      const userHabitsCopy = userHabits;
      userHabitsCopy.map(habit => habit.id === currentHabitCopy.id ? currentHabitCopy : habit);
      setUserHabits(userHabitsCopy);

    } catch (error) {
      console.error(`Error marking habit as COMPLETE for today: `, error);
    }
  }

  // --------------------------------------
  // UPDATE HABIT COMPLETIONS - Remove Date
  // --------------------------------------

  async function markHabitAsIncomplete() {
    try {
      // Pull the selectedDate
      // Use the selectedDate to find the id of the habitDateCompleted
      // Use that habitDateCompletedId for the DELETE fetch request.

      const relevantId = currentHabit.habitDatesCompleted.find(object => object.date === new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 10).replaceAll("-", "/")).id || null;

      if (relevantId === null) {
        console.log("Id returned as null. Habit will not be marked as incompleted on this date.");
        return;
      }

      // Sends a post request to create an item in habitDatesCompleted
      const response = await fetch (`http://localhost:5050/habits/datesCompleted/${relevantId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${ accessToken }`
        },
      });

      if (!response.ok) {
        throw new Error(`Habit could not be marked as INCOMPLETE: `, response.status);
      }

      const data = await response.json();
      console.log(data);

      setCurrentHabit(prev => ({
        ...prev,
        habitDatesCompleted: prev.habitDatesCompleted.filter(object => object.id !== relevantId)
      }));

      // Update userHabits to reflect changes in UI [ WORKS ]
      const currentHabitCopy = currentHabit;
      const filteredHabitDatesCompleted = currentHabitCopy.habitDatesCompleted.filter(object => object.id !== relevantId);
      currentHabitCopy.habitDatesCompleted = filteredHabitDatesCompleted;
      const userHabitsCopy = userHabits;
      userHabitsCopy.map(habit => habit.id === currentHabitCopy.id ? currentHabitCopy : habit);
      setUserHabits(userHabitsCopy);

    } catch (error) {
      console.error(`Error marking habit as INCOMPLETE for today: `, error);
    }
  }

  async function deleteHabit() { 
    try {
      const response = await fetch(`http://localhost:5050/habits/${ currentHabit.id }`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Couldn't delete habit:", response.status);
      }

      const data = await response.json();
      console.log(data);

      setCurrentHabit({});
      setUserHabits(prev => prev.filter(habit => habit.id !== currentHabit.id));
      setShowDeleteOverlay(false);
      alert("Habit has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1030px]">

      {showDeleteOverlay === true && <DeleteConfirmation deleteHabit={deleteHabit} deleteOverlayType={"Habit"}/>}

      {showOverlay === true &&
        <HabitOverlay
          accessToken={accessToken}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          createOrEditMode={createOrEditMode}
          setCreateOrEditMode={setCreateOrEditMode}
          userHabits={userHabits}
          setUserHabits={setUserHabits}
          currentHabit={currentHabit}
          setCurrentHabit={setCurrentHabit}
        />
      }

      <div className='flex flex-col gap-4'>
        <h1 className="text-[1.5rem] font-semibold">My Habits</h1>

        <YearlyHeatmapForHabits
          currentHabit={currentHabit}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex justify-between gap-4 items-center">

          <div className="flex flex-col gap-1">
            <span>HABIT -  {currentHabit.name || "N/A"}</span>
            <span>DESCRIPTION - {currentHabit.description || "N/A"}</span>
          </div>

          <div className="flex gap-2 items-center">
            {
              Object.keys(currentHabit).length > 0 && !currentHabit?.habitDatesCompleted?.map(object => object.date).includes(new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 10).replaceAll("-", "/")) && 
              <button className="px-2 border text-[lime]" onClick={() => {markHabitAsComplete()}} type='button'>Mark as Complete</button> 
            }
            {
              Object.keys(currentHabit).length > 0 && currentHabit?.habitDatesCompleted?.map(object => object.date).includes(new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 10).replaceAll("-", "/")) && 
              <button className="px-2 border text-[orange]" onClick={() => {markHabitAsIncomplete()}} type='button'>Mark as Incomplete</button>
            }

            {
              Object.keys(currentHabit).length > 0 &&
                <>
                  <button 
                    className="px-2 border" 
                    onClick={() => { 
                      setCreateOrEditMode("Edit"); 
                      setShowOverlay(true); 
                    }}
                  >Edit Habit</button>
                  
                  <button 
                    className="px-2 border text-[red]"
                    onClick={() => { 
                      setShowDeleteOverlay(true);
                    }}
                    type='button'
                  >Delete Habit</button>
                </>
            }
            
          </div>
        </div>

        <hr></hr>

        <div className="flex flex-col gap-4">
          <div className='flex justify-between'>
            <h2 className="text-[1.25rem] font-semibold">All Habits</h2>
            <button className="px-2 border" onClick={() => { setCreateOrEditMode("Create"); setShowOverlay(true) }}>Create New Habit</button>
          </div>


          <div className="flex flex-wrap gap-4">
            {
              userHabits && userHabits.map((habit, index) => {
                return (
                  <button
                    className="flex flex-col border px-3 py-1 rounded"
                    key={index}
                    type="button"
                    onClick={() => { setCurrentHabit(habit); console.log(habit); }}
                  >
                    <span className="text-[0.875rem] text-start">{habit.name}</span>
                    {/* <span className="text-[0.75rem]">{ habit.description }</span> */}
                  </button>
                )
              })
            }
          </div>

          <hr></hr>

          <div className="flex flex-wrap gap-4">
            <h2 className='text-[1.25rem] font-semibold'>Habits Due Today</h2>
          </div>

          <hr></hr>

          <div className="flex flex-wrap gap-4">
            <h2 className='text-[1.25rem] font-semibold'>Habits Completed Today</h2>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Habits;