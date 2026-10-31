import { useState, useEffect } from "react";

const DeleteConfirmation = (props) => {
  const deleteCustomTextArea = props.deleteCustomTextArea;
  const deleteJournalEntry = props.deleteJournalEntry;
  const deleteHabit = props.deleteHabit;
  const deleteTask = props.deleteTask;

  const setShowDeleteOverlay = props.setShowDeleteOverlay
  const deleteOverlayType = props.deleteOverlayType;

  return (
    <div
      className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center dark-transparent-bg z-30"
      onClick={() => { setShowDeleteOverlay(false) }}
    >
        <form className="p-4 rounded flex flex-col gap-2 items-center bg-blue-700" onClick={(e) => e.stopPropagation()}>
          <h1>Are you sure you want to delete this { deleteOverlayType }?</h1>

          <div className="flex gap-4">
            <button 
              className="border px-2 py-1 w-fit opacity-75" 
              onClick={() => setShowDeleteOverlay(false)}
              type="button"
            >Cancel</button> 
            
            <button className="border px-2 py-1 w-fit text-[red]" onClick={() => {
              if (deleteOverlayType === "CustomTextArea") {
                deleteCustomTextArea();
              } else if (deleteOverlayType === "Journal") {
                deleteJournalEntry();
              } else if (deleteOverlayType === "Habit") {
                  deleteHabit();
              } else if (deleteOverlayType === "Task") {
                deleteTask();
              }
            }} type="button">Delete</button>
          </div>
        </form>
    </div>
  )
}

export default DeleteConfirmation