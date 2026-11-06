import React from 'react'
import { useState, useEffect } from "react";


const YearlyHeatmapForJournalEntries = (props) => {
  const handleDateChange = props.handleDateChange;

  const date = props.date;
  const setDate = props.setDate;
  const datesWithCOMPLETEJournalEntries = props.datesWithCOMPLETEJournalEntries;
  const datesWithINCOMPLETEJournalEntries = props.datesWithINCOMPLETEJournalEntries;

  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [allHeatmapDates, setAllHeatmapDates] = useState([]);

  // Initialize all dates on the Yearly heatmap
  useEffect(() => {
    const startDate = new Date(currYear, 0, 1);
    const dates = []

    for (let date = new Date(startDate); date.getFullYear() === currYear; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }

    setAllHeatmapDates(dates);
  }, [currYear]);

  return (
    <div className="flex flex-col gap-4 border p-4 w-fit min-w-[988px]">

      <div className="flex justify-between">

        <div className="flex gap-4 justify-between items-center w-full">

          <p className="text-[1.125rem] font-semibold">{currYear}</p>
          <div className="flex gap-1">
            <button className="border px-2 py-[0.125rem] text-[0.875rem]" 
              onClick={() => { setCurrYear(currYear - 1) } }
            >{`<`}</button>
            
            <button className="border px-2 text-[0.875rem]" 
              onClick={() => {
                setCurrYear(new Date().getFullYear());
                setDate(new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ));
              }}
            // >{`${new Date().getFullYear()}`}</button>
            >{`Today`}</button>
            
            <button 
              className="border px-2 text-[0.875rem]" 
              onClick={() => setCurrYear(currYear + 1)}
            >{`>`}</button>
          </div>

        </div>
    </div>

    <div className="yearly-heatmap-container">
        { 
          new Date(currYear, 0, 1).getDay() - 1 !== -1 && new Date(currYear, 0, 1).getDay() - 1 !== 7 
          && Array( new Date(currYear, 0, 1).getDay() ).fill().map((_, index) => {
            return <div key={index} className="hidden-yearly-date-block"></div>
          })
        }
        {
          allHeatmapDates.map((heatmapDate, index) => (
            <div 
              key={index} 
              className="yearly-date-block relative"

              style={{
                backgroundColor: 
                  datesWithCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) ? "var(--heatmap-completed)"
                  : datesWithINCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) ? "var(--heatmap-incomplete)"
                  // : heatmapDate.toDateString() === new Date().toDateString() ? "var(--heatmap-today)" 
                  : "var(--heatmap-empty)",
                border: 
                  heatmapDate.toDateString() === date.toDateString() ? "0.1875rem solid var(--heatmap-selected)" 
                  : heatmapDate.toDateString() === new Date().toDateString() ? "var(--heatmap-today) solid 0.1875rem" 
                  : ""
              }}

              onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
              onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
              onClick={() => { console.log(heatmapDate); setDate(heatmapDate); }}
            >
              <span 
                className="absolute hidden text-nowrap top-[-2.5rem] left-[-3.75rem] z-10 px-2 py-1" 
                style={{ 
                  backgroundColor: "var(--main-bg)", 
                  color: "var(--text)",
                  border: "1px solid var(--border)"
                }}
              >{heatmapDate.toDateString()}</span>

            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default YearlyHeatmapForJournalEntries