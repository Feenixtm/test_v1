  // --------------------------
  // -- Create journal entry --
  // --------------------------

  async function createJournalEntry(date, accessToken, morningEntry, afternoonEntry, eveningEntry) {
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
      return data;
    } catch (error) {
      console.error("Error creating journal entry:", error);
    }
  }

  // --------------------------
  // -- Update journal entry --
  // --------------------------

  async function updateJournalEntry(entryId, accessToken, morningEntry, afternoonEntry, eveningEntry) {
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
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // --------------------------
  // -- Delete journal entry --
  // --------------------------

  async function deleteJournalEntry(entryId, accessToken, setUserEntries, setEntryId, setMorningEntryEntry, setAfternoonEntry, setEveningEntry) {
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

  export { createJournalEntry, updateJournalEntry, deleteJournalEntry };