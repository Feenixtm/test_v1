import { useState, useEffect } from 'react';
import YearlyHeatmapForJournalEntries from '../../heatmaps/components/YearlyHeatmapForJournalEntries';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

const Journal = (props) => {
  const accessToken = props.accessToken;
  const userEntries = props.userEntries;
  const setUserEntries = props.setUserEntries;

  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const [date, setDate] = useState(new Date());
  // OLD - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const [allJournalEntries, setAllJournalEntries] = useState([]);

  const [entryId, setEntryId] = useState(null);
  const [morningEntry, setMorningEntryEntry] = useState('');
  const [afternoonEntry, setAfternoonEntry] = useState('');
  const [eveningEntry, setEveningEntry] = useState('');

  const allSections = [
    { label: "Morning Entry", value: morningEntry, setValue: setMorningEntryEntry, placeholder: "Make a plan for the day..." },
    { label: "Afternoon Entry", value: afternoonEntry, setValue: setAfternoonEntry, placeholder: "Write down your thoughts..." },
    { label: "Evening Entry", value: eveningEntry, setValue: setEveningEntry, placeholder: "Reflect on how the day went. Make plans for tomorrow..." }
  ]

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
    <div className="flex flex-col gap-4 my-6 h-full">

      <h1 className="text-[1.5rem] font-semibold py-2">My Journal</h1>

      { showDeleteOverlay === true && 
        <DeleteConfirmation deleteJournalEntry={deleteJournalEntry} deleteOverlayType={"Journal"} setShowDeleteOverlay={setShowDeleteOverlay}/>
      }

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
        handleDateChange={handleDateChange}
      />

      <div className="flex flex-col gap-4 max-w-[988px] xl:max-w-[1136.23px]">

        <div className="flex justify-between">
          <button
              className="px-4 border border-[var(--border)] self-center"
              onClick={() => handleDateChange(-1)}
            >{`<`}</button>

            <span className="text-[1.5rem] font-semibold underline">{date.toDateString()}</span>

            <button
              className="px-4 border border-[var(--border)] self-center"
              onClick={() => handleDateChange(1)}
            >{`>`}</button>
        </div>
        
        {/* <hr></hr> */}

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">

            {allSections.map((section, index) => (
              <details open key={index} className="flex flex-col">
                <summary className="text-[1.25rem] font-semibold cursor-pointer">{section.label}</summary>
                <div>
                  <textarea
                    className="journal-textarea mt-2 p-2 border w-full"
                    // rows={8}
                    placeholder={section.placeholder}
                    value={section.value}
                    onChange={(e) => section.setValue(e.target.value)}
                  />
                </div>
              </details>
            ))}

          </div>

          <div className="flex justify-end gap-2">

            { entryId && (
              <button
                className="px-2 py-1 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem] text-red-500"
                type="button"
                onClick={() => setShowDeleteOverlay(true)}
              >Delete</button>
            )}

            { entryId && (
              <button
                className="px-2 py-1 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                type="button"
                onClick={() => updateJournalEntry()}
              >Save</button>
            )}

            {!entryId && (
              <>
                <div></div>
                <button
                  className="px-2 py-1 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                  type="button"
                  onClick={() => createJournalEntry()}
                >Create</button>
              </>
            )}

          </div>
        </form>
      </div>

    </div>
  );
};

export default Journal;