
import React from 'react';
import { useState, useEffect } from 'react';

const YearlyHeatmap = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [allViewableDates, setAllViewableDates] = useState([]);

    const mockCompletedDates = [
        new Date(2026, 0, 1).toDateString(),
        new Date(2026, 0, 2).toDateString(),
        new Date(2026, 0, 4).toDateString(),   
    ]

    /*
        All viewable dates
        {
            year: 2026
            dates: []
        }
    */

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    useEffect(() => {
        const startDate = new Date(year, 0, 1);
        const dates = []

        for (let date = new Date(startDate); date.getFullYear() === year; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }
        setAllViewableDates(dates);
    }, [year]);

    return (
        <div className="flex flex-col gap-4">
            <span>Yearly Heatmap Component</span>

            <div className="flex gap-4 items-center">
                <p>Year: {year}</p>
                <div className="flex gap-1">
                    <button className="border px-2 py-1" onClick={() => setYear(year - 1)}>{`<`}</button>
                    <button className="border px-2 py-1" onClick={() => setYear(new Date().getFullYear())}>{`Today`}</button>
                    <button className="border px-2 py-1" onClick={() => setYear(year + 1)}>{`>`}</button>
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
                    allViewableDates.map((date, index) => (
                        <div key={index} className="yearly-date-block relative" style={{ backgroundColor: mockCompletedDates.includes(date.toDateString()) ? "green" : "var(--black-45)" }}
                            onMouseOver={(e) => e.currentTarget.querySelector("span").style.display = "block"}
                            onMouseOut={(e) => e.currentTarget.querySelector("span").style.display = "none"}
                        >
                            <span className="absolute hidden text-nowrap text-[0.875rem] top-[-2.25rem] left-[-3.25rem] z-10 px-2 py-1" style={{ backgroundColor: "var(--black-33)", color: "var(--white-241),", border: "1px solid white"  }}>{date.toDateString()}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default YearlyHeatmap;