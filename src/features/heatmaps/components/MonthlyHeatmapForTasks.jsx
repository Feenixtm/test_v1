import { useState, useEffect } from "react";

const MonthlyHeatmapForTasks = (props) => {
  // Swap the selectedDate useState with date prop?
  const date = props.date;
  const setDate = props.setDate;
  const currentTask = props.currentTask;
  const dateDone = props.dateDone;
  const dueDate = props.dueDate;

  // Date that the user can select by clicking on a date block
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Date purely meant to show the correct month the user is trying to view on the heatmap.
  const [heatmapDate, setHeatmapDate] = useState(new Date());

  useEffect(() => {
    const startOfMonth = new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), 1);
    const endOfMonth = new Date(heatmapDate.getFullYear(), heatmapDate.getMonth() + 1, 0);
  }, [heatmapDate])

  return (
    <div className="flex flex-col self-center gap-4 p-4 border w-fit">
      {/* <h1>Monthly Heatmap for Tasks</h1> */}

      <div className="flex justify-between gap-4">
        {/* <span className="font-semibold">{ selectedDate.toISOString().split("T")[0].slice(0, 7)}</span> */}
        <span className="font-semibold">{ heatmapDate.toDateString().slice(4, 7)} { heatmapDate.toDateString().slice(-4)}</span>

        <div className="flex gap-1">
          <button className="border-b px-2 text-[0.875rem]" onClick={() => setHeatmapDate(new Date(heatmapDate.setMonth(heatmapDate.getMonth() - 1)))}>{`<`}</button>
          <button className="border-b px-2 text-[0.875rem]" onClick={() => { setSelectedDate(new Date()); setHeatmapDate(new Date()) }}>{`Today`}</button>
          <button className="border-b px-2 text-[0.875rem]" onClick={() => setHeatmapDate(new Date(heatmapDate.setMonth(heatmapDate.getMonth() + 1)))}>{`>`}</button>
        </div>        
      </div>

      <div className="flex items-start min-h-[12.625rem]">
        <div className="flex flex-wrap gap-[0.125rem] max-w-[14.75rem]">
          <div className="flex gap-[0.125rem] w-full mb-[0.125rem]">
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Sun</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Mon</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Tue</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Wed</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Thu</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Fri</span>
            <span className="text-center self-end text-[0.75rem] min-w-[2rem] border-b-1">Sat</span>
          </div>

          {
            Array.from({ length: new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), 0).getDay() + 1 }).map((_, index) => {
              return (
                <div className="hidden-monthly-date-block" key={index}></div>
              )
            })
          }

          {
            Array.from({ length: new Date(heatmapDate.getFullYear(), heatmapDate.getMonth() + 1, 0).getDate() }).map((_, index) => {
              return (
                <button 
                  className="monthly-date-block" 
                  type="button" 
                  key={index}
                  style={{ 
                    color: 
                    dateDone === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] && new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "var(--black-45)"
                    : dateDone === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] ? "var(--black-45)"
                    : dueDate === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] && new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "var(--black-15)"
                    : dueDate === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] ? "var(--black-15)"
                    : new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "white" : '', 

                    backgroundColor: 
                    dateDone === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] && new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "lightgreen"
                    : dateDone === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] ? "rgb(0, 225, 0)"
                    : dueDate === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] && new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "PeachPuff"
                    : dueDate === new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toISOString().split("T")[0] ? "orange"
                    : new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1).toDateString() === selectedDate.toDateString() ? "var(--black-90)" : 'var(--black-33)' 
                  }}
                  onClick={() => {setSelectedDate( new Date(heatmapDate.getFullYear(), heatmapDate.getMonth(), index + 1) )}}
                >{ index + 1 }</button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MonthlyHeatmapForTasks