
import React from 'react';
import { useEffect } from 'react';

const Journal = () => {
    const [allEntries, setAllEntries] = React.useState([{ date: new Date(), morning: 'Yo', afternoon: 'Sup', evening: 'Hello' }]);
    const [date, setDate] = React.useState(new Date());
    const [morningEntry, setMorningEntryEntry] = React.useState('');
    const [afternoonEntry, setAfternoonEntry] = React.useState('');
    const [eveningEntry, setEveningEntry] = React.useState('');

    const handleDateChange = (value) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + value);
        setDate(newDate);
    }

    useEffect(() => {
        const entry = allEntries.find(entry => entry.date.toDateString() === date.toDateString());
        if (entry) {
            setMorningEntryEntry(entry.morning);
            setAfternoonEntry(entry.afternoon);
            setEveningEntry(entry.evening);
        } else {
            setMorningEntryEntry('');
            setAfternoonEntry('');
            setEveningEntry('');
        }
    }, [date]);

    const handleSave = () => {
        const newEntry = {
            date,
            morning: morningEntry,
            afternoon: afternoonEntry,
            evening: eveningEntry
        };

        const existingEntryIndex = allEntries.findIndex(entry => entry.date.toDateString() === date.toDateString());

        if (existingEntryIndex !== -1) {
            const allEntriesCopy = [...allEntries];
            allEntriesCopy[existingEntryIndex] = newEntry;
            setAllEntries(allEntriesCopy);
        } else {
            setAllEntries([...allEntries, newEntry]);
        }

        alert("Save successful!");
    }; 

    return (
        <div className="container flex flex-col gap-4 border px-8 py-6 rounded-[0.5rem]">
            <div className="flex justify-between">
                <h1 className="text-[1.5rem] font-semibold">Journal</h1>

                <div className="flex gap-4 items-center">

                    <span className="text-[1.25rem]">{date.toDateString()}</span>

                    <div className="flex gap-2">
                        <button 
                            className="px-2 border py-1 self-center rounded-[0.125rem]"
                            onClick={() => handleDateChange(-1)}
                        >{`<`}</button>

                        <button 
                            className="px-2 border py-1 self-center rounded-[0.125rem]"
                            onClick={() => setDate(new Date())}
                        >{`Today`}</button>
                        
                        <button 
                            className="px-2 border py-1 self-center rounded-[0.125rem]"
                            onClick={() => handleDateChange(1)}
                        >{`>`}</button>
                    </div>

                </div>
            </div>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <label>Morning Entry</label>
                    <textarea
                        className="p-2 border w-full"
                        rows={6}
                        placeholder="Morning Entry"
                        value={morningEntry}
                        onChange={(e) => setMorningEntryEntry(e.target.value)}
                    />

                    <label>Afternoon Entry</label>
                    <textarea
                        className="p-2 border w-full"
                        rows={6}
                        placeholder="Afternoon Entry"
                        value={afternoonEntry}
                        onChange={(e) => setAfternoonEntry(e.target.value)}
                    />

                    <label>Evening Entry</label>
                    <textarea
                        className="p-2 border w-full"
                        rows={6}
                        placeholder="Evening Entry"
                        value={eveningEntry}
                        onChange={(e) => setEveningEntry(e.target.value)}
                    />
                </div>

                <button 
                    className="self-end px-4 py-2 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]" 
                    type="button"
                    onClick={() => handleSave()}
                >Save</button>
            </form>
        </div>
    );
};

export default Journal;