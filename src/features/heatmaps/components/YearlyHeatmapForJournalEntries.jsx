import React from 'react'
import { useState, useEffect } from "react";


const YearlyHeatmapForJournalEntries = (props) => {
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
    <div className="flex flex-col gap-4 border p-4">

      <div className="flex justify-between">

        <div className="flex gap-4 items-center">
          <p>Year: {currYear}</p>
          <div className="flex gap-1">
            <button className="border px-2 py-[0.125rem] text-[0.875rem]" 
              onClick={() => { setCurrYear(currYear - 1) } }
            >{`<`}</button>
            
            <button className="border px-2 text-[0.875rem]" 
              onClick={() => {
                setCurrYear(new Date().getFullYear());
                setDate(new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ));
              }}
            >{`${new Date().getFullYear()}`}</button>
            
            <button 
              className="border px-2 text-[0.875rem]" 
              onClick={() => setCurrYear(currYear + 1)}
            >{`>`}</button>
          </div>
        </div>
    </div>

    <div className="yearly-heatmap-container max-h-[6rem] xl:max-h-[8.25rem]">
        { 
          new Date(currYear, 0, 1).getDay() - 1 !== -1 && new Date(currYear, 0, 1).getDay() - 1 !== 7 
          && Array( new Date(currYear, 0, 1).getDay() - 1 ).fill().map((_, index) => {
            return <div key={index} className="hidden-yearly-date-block p-[0.375rem] xl:p-[0.5625rem]"></div>
          })
        }
        {
          allHeatmapDates.map((heatmapDate, index) => (
            <div 
              key={index} 
              className="yearly-date-block relative p-[0.375rem] xl:p-[0.5625rem]" 

              style={{
                backgroundColor: 
                  datesWithCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) && heatmapDate.toDateString() === date.toDateString() ? "lightgreen"
                  : datesWithCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) ? "lime"
                  : datesWithINCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) && heatmapDate.toDateString() === date.toDateString() ? "PeachPuff"
                  : datesWithINCOMPLETEJournalEntries.includes(heatmapDate.toDateString()) ? "orange"
                  : date.getTime() === heatmapDate.getTime() ? "var(--black-90)" : "var(--black-45)"
              }}

              onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
              onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
              onClick={() => { console.log(heatmapDate); setDate(heatmapDate); }}
            >
              <span 
                className="absolute hidden text-nowrap text-[0.875rem] top-[-2.25rem] left-[-3.25rem] z-10 px-2 py-1" 
                style={{ 
                  backgroundColor: "var(--black-33)", 
                  color: "var(--white-241),", 
                  border: "1px solid white"  
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