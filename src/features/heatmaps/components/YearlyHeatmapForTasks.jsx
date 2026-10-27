import React from 'react'
import { useState, useEffect } from "react";

const YearlyHeatmapForTasks = (props) => {
  const date = props.date;
  const setDate = props.setDate;
  const currentTask = props.currentTask;

  const dateDone = props.dateDone;
  const dueDate = props.dueDate;

  const [year, setYear] = useState(new Date().getFullYear());
  const [allDates, setAllDates] = useState([]);

  // --------------------------
  // --- Handle Date Change ---
  // --------------------------

  const handleDateChange = (value) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + value);
    setDate(newDate);
  }

  useEffect(() => {
    if (currentTask !== null) {
      console.log(currentTask);
    }
  }, [])

  useEffect(() => {
    const startDate = new Date(year, 0, 1);
    // console.log(startDate);
    const dates = []

    for (let date = new Date(startDate); date.getFullYear() === year; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }

    setAllDates(dates);
  }, [year])  

  return (
    <div 
      className="flex flex-col gap-4 w-fit p-4 rounded-[0.25rem]"
      style={{ border: "1px solid white" }}  
    >

      <div className="flex justify-between">
        <div className="flex gap-1">
          <button className="border-b px-1 py-[0.125rem] text-[0.875rem]" onClick={() => { handleDateChange(-1) }}>{`<`}</button>
          <span className="min-w-[8rem] text-center px-2 py-[0.125rem] text-[0.875rem]">{ date.toDateString() }</span>
          <button className="border-b px-1 text-[0.875rem]" onClick={() => { handleDateChange(1)}}>{`>`}</button>
        </div>

        <div className="flex gap-4 items-center">
          <p>Year: {year}</p>
          <div className="flex gap-2">
            <button className="border-b px-1 py-[0.125rem] text-[0.875rem]" onClick={() => setYear(year - 1)}>{`<`}</button>
            <button className="border-b px-1 text-[0.875rem]" onClick={() => {
                setYear(new Date().getFullYear());
                setDate(new Date());
            }}>{`Today`}</button>
            <button className="border-b px-1 text-[0.875rem]" onClick={() => setYear(year + 1)}>{`>`}</button>
          </div>
        </div>
      </div>

      <div className="yearly-heatmap-container">
        { 
          new Date(year, 0, 1).getDay() - 1 !== -1 && new Date(year, 0, 1).getDay() - 1 !== 7 &&
          Array( new Date(year, 0, 1).getDay() - 1 ).fill().map((_, index) => {
            return <div key={index} className="hidden-yearly-date-block"></div>
          })
        }

        {
          allDates && allDates.map((dateBlockDate, index) => (
            <div 
              key={index} 
              className="yearly-date-block relative" 

              style={{
                background: (() => {
                  const dateBlockDateStr = dateBlockDate ? dateBlockDate.toISOString().split("T")[0] : null;
                  const dateDoneStr = dateDone ? dateDone : null;
                  const dueDateStr = dueDate ? dueDate : null;
                  const dateStr = date ? date.toISOString().split("T")[0] : null;

                  if (dateBlockDateStr === dateStr && dateBlockDateStr === dateDoneStr) return "lightgreen";
                  if (dateBlockDateStr === dateDoneStr) return "green";
                  if (dateBlockDateStr === dateStr && dateBlockDateStr === dueDateStr) return "PeachPuff";
                  if (dateBlockDateStr === dueDateStr) return "orange";
                  if (dateBlockDateStr === dateStr) return "var(--black-90)"

                  return "var(--black-45)"
                })()
              }}

              onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
              onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
              onClick={() => { console.log(dateBlockDate.toDateString()); setDate(dateBlockDate); }}
            >
              <span className="absolute hidden text-nowrap text-[0.875rem] top-[-2.25rem] left-[-3.25rem] z-10 px-2 py-1" style={{ backgroundColor: "var(--black-33)", color: "var(--white-241),", border: "1px solid white"  }}>{dateBlockDate.toDateString()}</span>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default YearlyHeatmapForTasks