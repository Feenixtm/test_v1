import { useState, useEffect } from 'react';
import YearlyHeatmapForJournalEntries from '../../heatmaps/components/YearlyHeatmapForJournalEntries';

const Journal = (props) => {
  const accessToken = props.accessToken;
  const userEntries = props.userEntries;
  const setUserEntries = props.setUserEntries;

  const [date, setDate] = useState(new Date());
  // OLD - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const [allJournalEntries, setAllJournalEntries] = useState([]);

  const [entryId, setEntryId] = useState(null);
  const [morningEntry, setMorningEntryEntry] = useState('');
  const [afternoonEntry, setAfternoonEntry] = useState('');
  const [eveningEntry, setEveningEntry] = useState('');

  const handleDateChange = (value) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + value);
    setDate(newDate);
  }

  // Return to today's date on route change.
  useEffect(() => {
    // setDate(new Date());
    setDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  }, [])

  useEffect(() => {
    const normalizedDate = date.setHours(0, 0, 0, 0);
    const relevantEntry = allJournalEntries.find(entry => new Date(entry.date).toDateString() === new Date(normalizedDate).toDateString());

    if (relevantEntry) {
      setEntryId(relevantEntry.id);
      setMorningEntryEntry(relevantEntry.morningContent);
      setAfternoonEntry(relevantEntry.afternoonContent);
      setEveningEntry(relevantEntry.eveningContent);
    } else {
      setEntryId(null);
      setMorningEntryEntry('');
      setAfternoonEntry('');
      setEveningEntry('');
    }
  }, [date]);

  // -----------------------------
  // -- Initialize journal data --
  // -----------------------------

  useEffect(() => {
    if (userEntries) {
      setAllJournalEntries(userEntries.sort((a, b) => a.id - b.id));
    }
  }, [userEntries]);

  // --------------------------
  // -- Create journal entry --
  // --------------------------

  async function createJournalEntry() {
    try {
      const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      // console.log(formattedDate);

      const response = await fetch("http://localhost:5050/journal", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: formattedDate,
          morningContent: morningEntry,
          afternoonContent: afternoonEntry,
          eveningContent: eveningEntry
        })
      });

      const data = await response.json();
      console.log(data);

      setUserEntries(prev => [...prev, data.newJournalEntry]);
      setEntryId(data.newJournalEntry.id);

      alert("Journal entry successfully created!");
    } catch (error) {
      console.error("Error creating journal entry:", error);
    }
  }

  // --------------------------
  // -- Update journal entry --
  // --------------------------

  async function updateJournalEntry() {
    try {
      const response = await fetch(`http://localhost:5050/journal/${ entryId }`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          morningContent: morningEntry,
          afternoonContent: afternoonEntry,
          eveningContent: eveningEntry
        })
      });

      const data = await response.json();
      console.log(data);

      setUserEntries(prev => prev.map(entry => entry.id === data.updatedEntry.id ? data.updatedEntry : entry));

      alert("Journal entry updated successfully!");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // --------------------------
  // -- Delete journal entry --
  // --------------------------

  async function deleteJournalEntry() {
    try {
      const response = await fetch(`http://localhost:5050/journal/${ entryId }`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      console.log(data);

      setUserEntries(prev => prev.filter(entry => entry.id !== entryId));
      setEntryId(null);
      setMorningEntryEntry('');
      setAfternoonEntry('');
      setEveningEntry('');

      alert("Journal entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full py-8">

      <YearlyHeatmapForJournalEntries
        datesWithCOMPLETEJournalEntries={ 
          allJournalEntries.filter(entry => 
            entry.morningContent.trim() !== ""
            && entry.afternoonContent.trim() !== ""
            && entry.eveningContent.trim() !== ""
          ).map(entry => new Date(entry.date).toDateString())
        }
        datesWithINCOMPLETEJournalEntries={ 
          allJournalEntries.filter(entry => 
            entry.morningContent.trim() === ""
            || entry.afternoonContent.trim() === ""
            || entry.eveningContent.trim() === ""
          ).map(entry => new Date(entry.date).toDateString())
        }
        date={date}
        setDate={setDate}
      />

      <div className="flex flex-col gap-4 border px-8 py-6 rounded-[0.5rem]">
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
                onClick={() => setDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))}
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
              rows={8}
              placeholder="Make a plan for the day..."
              value={morningEntry}
              onChange={(e) => setMorningEntryEntry(e.target.value)}
            />

            <label>Afternoon Entry</label>
            <textarea
              className="p-2 border w-full"
              rows={8}
              placeholder="Introspect in the moment..."
              value={afternoonEntry}
              onChange={(e) => setAfternoonEntry(e.target.value)}
            />

            <label>Evening Entry</label>
            <textarea
              className="p-2 border w-full"
              rows={8}
              placeholder="Reflect on how the day went..."
              value={eveningEntry}
              onChange={(e) => setEveningEntry(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-4">

            <button
              className="self-start px-4 py-2 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem] text-red-500"
              type="button"
              onClick={() => deleteJournalEntry()}
            >Delete</button>

            { entryId && (
              <button
                className="self-end px-4 py-2 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                type="button"
                onClick={() => updateJournalEntry()}
              >Save</button>
            )}

            {!entryId && (
              <button
                className="self-end px-4 py-2 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                type="button"
                onClick={() => createJournalEntry()}
              >Create</button>
            )}

          </div>
        </form>
      </div>

    </div>
  );
};

export default Journal;