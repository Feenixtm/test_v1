import { useState, useEffect } from "react";

const NotesOverlay = (props) => {
  const accessToken = props.accessToken;
  const setUserNotes = props.setUserNotes;

  const setTitle = props.setTitle;
  const setContent = props.setContent;
  const setTextAreaId = props.setTextAreaId;

  const setShowOverlay = props.setShowOverlay;

  const [name, setName] = useState("");
  
  async function createNote () {
    try {
      const response = await fetch("http://localhost:5050/custom-text-areas/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name
        })
      });

      if (!response.ok) {
        throw new Error("Could not create Custom Text Area");
      }

      const data = await response.json();
      console.log(data);
      setUserNotes(prev => [...prev, data.customTextArea ]);
      setName("");

      setTitle(data.customTextArea.name);
      setContent(data.customTextArea.notes || "");
      setTextAreaId(data.customTextArea.id);

      setShowOverlay(false);

      alert("Custom Text Area Created!");
    } catch (error) {
      console.error("Erroring creating Custom Text Area", error);
    }
  }
  
  return (
    <div 
      className="fixed top-0 left-0 w-[100vw] h-full flex justify-center items-center z-20 bg-[var(--transparent-overlay-bg)]"
      onClick={() => { setShowOverlay(false); }}
    >

      <form
        className="flex flex-col gap-2 px-6 py-4 rounded bg-[var(--secondary-bg)] min-w-[375px] w-full max-w-[475px]"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="text-[1.25rem] font-semibold">Name</label>
        <input 
          className="border px-2 py-1" 
          placeholder="E.g. My Goals for 2026"
          value={ name }
          onChange={(e) => setName(e.target.value)}
        ></input>
        
        <div className="flex justify-end">
          <button className="px-2 py-1 border" onClick={() => createNote()} type="button">Create</button>
        </div>
      </form>

    </div>
  )
}

export default NotesOverlay