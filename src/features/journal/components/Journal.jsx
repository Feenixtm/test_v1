import { useState, useEffect } from 'react';
import YearlyHeatmapForJournalEntries from '../../heatmaps/components/YearlyHeatmapForJournalEntries';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

import { createJournalEntry, updateJournalEntry, deleteJournalEntry } from '../functions/journalEntryCRUD';
import { createCheckpoint, updateCheckpoint, deleteCheckpoint } from '../functions/checkpointCRUD';

const Journal = (props) => {
  const accessToken = props.accessToken;
  const userCheckpoints = props.userCheckpoints;
  const setUserCheckpoints = props.setUserCheckpoints;
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

  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");

  // New useStates - Checkpoints 11/06/26 - WIP
  // CP = Checkpoint
  const [weeklyCPDate, setWeeklyCPDate] = useState(() => {
    const date = new Date();
    // This will return the start of the week.
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [monthlyCPDate, setMonthlyCPDate] = useState(() => {
    const date = new Date();
    // This will return the start of the month;
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [weeklyCPId, setWeeklyCPId] = useState(null);
  const [weeklyCPNotes, setWeeklyCPNotes] = useState("");
  const [monthlyCPId, setMonthlyCPId] = useState(null);
  const [monthlyCPNotes, setMonthlyCPNotes] = useState("");

  const allSections = [
    { label: "Morning Entry", value: morningEntry, setValue: setMorningEntryEntry, placeholder: "Make a plan for the day..." },
    { label: "Afternoon Entry", value: afternoonEntry, setValue: setAfternoonEntry, placeholder: "Write down your thoughts..." },
    { label: "Evening Entry", value: eveningEntry, setValue: setEveningEntry, placeholder: "Reflect on how the day went. Make plans for tomorrow..." }
  ]

  const handleWeeklyCPDateChange = (value) => {
    const date = new Date(weeklyCPDate);
    if (value === 1) {
      date.setDate(date.getDate() + 7);
    } else if (value === -1) {
      date.setDate(date.getDate() - 7);
    }
    date.setHours(0, 0, 0, 0);
    console.log(date);
    setWeeklyCPDate(date);
    return date;
  }

  const handleMonthlyCPDateChange = (value) => {
    const date = new Date(monthlyCPDate);
    if (value === 1) {
      date.setMonth(date.getMonth() + 1);
    } else if (value === -1) {
      date.setMonth(date.getMonth() - 1);
    }
    date.setHours(0, 0, 0, 0);
    // console.log(date);
    setMonthlyCPDate(date);
    return date;
  }

  // Stick to weekly and monthly for now?
  const mockCheckpoints = [
    {
      id: weeklyCPId,
      setId: setWeeklyCPId,
      frequency: 'Weekly',
      checkpointDate: weeklyCPDate,
      changeCheckpointDate: handleWeeklyCPDateChange,
      resetCheckpointDate: () => {
        const date = new Date();
        date.setDate(date.getDate() - date.getDay());
        date.setHours(0, 0, 0, 0);
        // console.log(date);
        setWeeklyCPDate(date);
        return date;
      },
      notes: weeklyCPNotes,
      setNotes: setWeeklyCPNotes
    },
    {
      id: monthlyCPId,
      setId: setMonthlyCPId,
      frequency: 'Monthly',
      checkpointDate: monthlyCPDate,
      changeCheckpointDate: handleMonthlyCPDateChange,
      resetCheckpointDate: () => {
        const date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        // console.log(date);
        setMonthlyCPDate(date);
        return date;
      },
      notes: monthlyCPNotes,
      setNotes: setMonthlyCPNotes
    }
  ]

  // Pseudo-code - Mock Checkpoint Data
  
  const mockCheckpointData = [
    {
      id: 1,
      frequency: 'Weekly',
      checkpointDate: new Date(2026, 9, 25, 0, 0, 0, 0),
      notes: "First weekly note..."
    },
    {
      id: 2,
      frequency: 'Weekly',
      checkpointDate: new Date(2026, 10, 1, 0, 0, 0, 0),
      notes: "Second weekly note..."
    },
    {
      id: 3,
      frequency: 'Weekly',
      checkpointDate: new Date(2026, 10, 8, 0, 0, 0, 0),
      notes: "Third weekly note..."
    },
    {
      id: 4,
      frequency: 'Monthly',
      checkpointDate: new Date(2026, 9, 1, 0, 0, 0, 0),
      notes: "First monthly note..."
    },
    {
      id: 5,
      frequency: 'Monthly',
      checkpointDate: new Date(2026, 10, 1, 0, 0, 0, 0),
      notes: "Second monthly note..."
    },
    {
      id: 6,
      frequency: 'Monthly',
      checkpointDate: new Date(2026, 11, 1, 0, 0, 0, 0),
      notes: "Third monthly note..."
    }
  ]

  const mockMotivationalQuotes = [
    "Gotta lock in now before I gotta date crazy 28+ year olds.",
    "It's just like going to the gym. It's not about how hard you work out, it's about how often you do it.",
    "If you don't work you're gay.",
    "Please get a job bro. Think of all the hot girls we could be dating right now",
    "It's literally not even that hard man. Like, on a scale of 1-10 in terms of actual difficulty, this shit is like a 5-6 at MOST. It's the boredom that gets ya.",
    "Your parents spent a lot of money just for you to be here. Make it up to them man.",
    "Just do some bullshit and call it a day. Anything is fine as long as it gets done.",
    "Be the change you want to see in yourself or whatever.",
    "If we work now then we can goof off and play video games guilt free for the rest of the day.",
    "Need to get shit done before Bryan tells me to get on the game."
  ]

  const handleDateChange = (value) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + value);
    setDate(newDate);
  }

  // Return to today's date on route change.
  useEffect(() => {
    // setDate(new Date());
    setDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

    // Set quoteOfTheDay
    setQuoteOfTheDay(mockMotivationalQuotes[Math.floor(Math.random() * mockMotivationalQuotes.length)]);
  }, [])

  useEffect(() => {
    // console.log(userCheckpoints);
    // console.log(weeklyCPDate);
    // console.log(monthlyCPDate);

    const initialWeeklyCP = userCheckpoints.find(checkpoint => checkpoint.frequency === 'Weekly' && new Date(checkpoint.date).toDateString() === new Date(weeklyCPDate).toDateString());
    const initialMonthlyCP = userCheckpoints.find(checkpoint => checkpoint.frequency === 'Monthly' && new Date(checkpoint.date).toDateString() === new Date(monthlyCPDate).toDateString());

    if (initialWeeklyCP) {
      setWeeklyCPId(initialWeeklyCP.id);
      setWeeklyCPNotes(initialWeeklyCP.notes);
    } else {
      setWeeklyCPId(null);
      setWeeklyCPNotes('');
    }

    if (initialMonthlyCP) {
      setMonthlyCPId(initialMonthlyCP.id);
      setMonthlyCPNotes(initialMonthlyCP.notes);
    } else {
      setMonthlyCPId(null);
      setMonthlyCPNotes('');
    }
  }, []);

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

  return (
    <div className="flex flex-col gap-4 my-6 h-full">

      { showDeleteOverlay === true && 
        <DeleteConfirmation deleteJournalEntry={deleteJournalEntry} deleteOverlayType={"Journal"} setShowDeleteOverlay={setShowDeleteOverlay}/>
      }

      <div className="flex flex-col mt-10 mb-12">
        <h1 className="text-[1.5rem] font-semibold">My Journal</h1>
        <p className="font-[300] italic left-[1rem] relative">- {quoteOfTheDay}</p>
      </div>
      
      <div className="flex justify-between gap-4">
        {
          mockCheckpoints.map((checkpoint, index) => (
            // Old Checkpoint div. Dropdown idea scrapped since you'd have to collapse both for it to actually change. Looked a little awkward.
            // <details key={index} className="w-full flex flex-col gap-2">
            //   <summary className="">My {checkpoint.frequency} Goal</summary>
            //   <textarea rows={6} className='w-full border p-2'></textarea>
            // </details>

            <div key={index} className="w-full flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="">{checkpoint.frequency} Goal: { checkpoint.checkpointDate.toLocaleDateString("en-US") }</span>
              
                <div className="flex gap-1">
                  {/* <button className="px-1 border-b text-[0.75rem]">{`<<`}</button> */}
                  <button 
                    className="px-1 border-b text-[0.75rem]" 
                    onClick={() => {
                      const updatedDate = checkpoint.changeCheckpointDate(-1);
                      const relevantCheckpoint = userCheckpoints.find(userCheckpoint => userCheckpoint.frequency === checkpoint.frequency && new Date(userCheckpoint.date).toDateString() === updatedDate.toDateString());
                      console.log(relevantCheckpoint);
                      const relevantId = relevantCheckpoint?.id ?? null;
                      checkpoint.setId(relevantId);

                      const relevantNotes = relevantCheckpoint?.notes ?? "";
                      checkpoint.setNotes(relevantNotes);
                    }}>{`<`}</button>
                  <button 
                    className="px-2 border-b" 
                    onClick={() => {
                      const updatedDate = checkpoint.resetCheckpointDate(); 
                      const relevantCheckpoint = userCheckpoints.find(userCheckpoint => userCheckpoint.frequency === checkpoint.frequency && new Date(userCheckpoint.date).toDateString() === updatedDate.toDateString());

                      const relevantId = relevantCheckpoint?.id ?? null;
                      checkpoint.setId(relevantId);

                      const relevantNotes = relevantCheckpoint?.notes ?? "";
                      checkpoint.setNotes(relevantNotes);
                    }}>{`Current`}</button>
                  <button 
                    className="px-1 border-b text-[0.75rem]" 
                    onClick={() => {
                      const updatedDate = checkpoint.changeCheckpointDate(1);
                      const relevantCheckpoint = userCheckpoints.find(userCheckpoint => userCheckpoint.frequency === checkpoint.frequency && new Date(userCheckpoint.date).toDateString() === updatedDate.toDateString());

                      const relevantId = relevantCheckpoint?.id ?? null;
                      checkpoint.setId(relevantId);

                      const relevantNotes = relevantCheckpoint?.notes ?? "";
                      checkpoint.setNotes(relevantNotes);
                    }}>{`>`}</button>
                  {/* <button className="px-1 border-b text-[0.75rem]">{`>>`}</button> */}
                </div>
              </div>
              
              <textarea rows={8} className='w-full border p-2' value={checkpoint.notes} onChange={(e) => checkpoint.setNotes(e.target.value)}></textarea>
              
              {/* ------------------------------------------------------
              -------------- DELETE, SAVE, CREATE BUTTONS -------------- 
              ------------------------------------------------------ */}

              <div className="flex justify-end gap-2">
                {checkpoint.id !== null && (
                  <>
                    <button className="px-2 border" onClick={async () => {
                      const data = await deleteCheckpoint(accessToken, checkpoint.id, checkpoint.frequency);

                      if (data) {
                        console.log(data);
                        setUserCheckpoints(prev => prev.filter(userCheckpoint => userCheckpoint.id !== checkpoint.id));
                        checkpoint.setId(null);
                        checkpoint.setNotes("");
                        alert("Checkpoint deleted successfully!");
                      }
                    }}>Delete</button>

                    <button className="px-2 border" onClick={async () => {
                      const data = await updateCheckpoint(accessToken, checkpoint.id, checkpoint.frequency, checkpoint.notes);

                      if (data?.updatedCheckpoint) {
                        setUserCheckpoints(prev => prev.map(userCheckpoint => userCheckpoint.id === data.updatedCheckpoint.id ? data.updatedCheckpoint : userCheckpoint));
                        alert("Checkpoint updated successfully!");
                      }
                    }}>Save</button>
                  </>
                )}
              
                {
                  checkpoint.id === null && 
                  <button 
                    className="px-2 border" 
                    onClick={async () => {
                      const data = await createCheckpoint(accessToken, checkpoint.frequency, checkpoint.checkpointDate, checkpoint.notes);
                      
                      if (data?.newCheckpoint) {
                        setUserCheckpoints(prev => [...prev, data.newCheckpoint]);
                        checkpoint.setId(data.newCheckpoint.id);
                        alert("Checkpoint created successfully!");
                      }
                    }}
                  >Create</button>
                }
                
              </div>
            </div>
          ))
        }
      </div>
      

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
        // weeklyCPDate={weeklyCPDate}
        // monthlyCPDate={monthlyCPDate}
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

            {!entryId && (
              <>
                <div></div>
                <button
                  className="px-2 py-1 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                  type="button"
                  onClick={async () => {
                    const data = await createJournalEntry(date, accessToken, morningEntry, afternoonEntry, eveningEntry)
                    if (data) {
                      setUserEntries(prev => [...prev, data.newJournalEntry]);
                      setEntryId(data.newJournalEntry.id);
                      alert("Journal entry successfully created!");
                    }
                  }}
                >Create</button>
              </>
            )}

            { entryId && (
              <button
                className="px-2 py-1 border w-fit hover:bg-black hover:text-white cursor-pointer rounded-[0.125rem]"
                type="button"
                onClick={async () => {
                  const data = await updateJournalEntry(entryId, accessToken, morningEntry, afternoonEntry, eveningEntry);
                  if (data) {
                    setUserEntries(prev => prev.map(entry => entry.id === data.updatedEntry.id ? data.updatedEntry : entry));
                    alert("Journal entry updated successfully!");
                  }
                }}
              >Save</button>
            )}

          </div>
        </form>
      </div>

    </div>
  );
};

export default Journal;