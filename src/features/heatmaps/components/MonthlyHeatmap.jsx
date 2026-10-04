import React from 'react';
import { useState, useEffect } from 'react';

const MonthlyHeatmap = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        console.log("Date changed:", date.toDateString());
        setDate(date);
    }

    useEffect(() => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // console.log("Start of Month:", startOfMonth.toDateString());
        // console.log("End of Month:", endOfMonth.toDateString());   
        // console.log("Days in a month:", endOfMonth.getDate());
    }, [date]);

    return (
        <div className="flex flex-col gap-4 p-4 border">
            <h1>Monthly Heatmap</h1>

            <div className="flex flex-col gap-4">
                <span>MM/DD/YYYY - {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</span>
                <div className="flex gap-1">
                    <button className="border px-2 py-[0.125rem] text-[0.875rem]" onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>{`<`}</button>
                    <button className="border px-2 text-[0.875rem]" onClick={() => setDate(new Date())}>{`Today`}</button>
                    <button className="border px-2 text-[0.875rem]" onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>{`>`}</button>
                </div>

                <div className="flex items-start justify-center min-h-[12.625rem]">
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
                            Array.from({ length: new Date(date.getFullYear(), date.getMonth(), 0).getDay() + 1 }).map((_, index) => {
                                return (
                                    <div className="hidden-monthly-date-block" key={index}></div>
                                )
                            })
                        }
                        {
                            Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }).map((_, index) => {
                                return (
                                    <button 
                                        className="monthly-date-block" 
                                        type="button" 
                                        key={index}
                                        style={{ backgroundColor: date.toDateString() === new Date(date.getFullYear(), date.getMonth(), index + 1).toDateString() ? 'var(--black-90)' : 'var(--black-45' }}
                                        onClick={() => handleDateChange(new Date(date.getFullYear(), date.getMonth(), index + 1))}
                                    >{ index + 1 }</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyHeatmap;