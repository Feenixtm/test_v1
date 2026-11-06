import { useEffect, useState } from "react"
import NotesOverlay from "./NotesOverlay";
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const Notes = (props) => {
  const accessToken = props.accessToken;
  const userNotes = props.userNotes;
  const setUserNotes = props.setUserNotes;

  // ------------- New useStates -------------

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [sidebarWidth, setSidebarWidth] = useState(250);

  // -----------------------------------------

  const [showOverlay, setShowOverlay] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const [textAreas, setTextAreas] = useState([]);
  const [textAreaId, setTextAreaId] = useState(null);

  const mockTextAreas = [
    {
      name: "7 areas of Life: Career",
      notes: "Test starting note"
    },
    {
      name: "7 areas of Life: Emotional",
      notes: null
    },
    {
      name: "7 areas of Life: Financial",
      notes: null
    },
    {
      name: "7 areas of Life: Mental",
      notes: null
    },
    {
      name: "7 areas of Life: Physical",
      notes: "Round 1 Outcome: Lose face fat, Lose love handles (~sub 20% Body fat), Hit weight lifting PRs: 50-55 lb dumbbell shoulder press. 45-90lb Dip/Pull-up.\nRound 1 Output: Calorie deficit, protein shakes daily. Gym for estimated 2+ months (Assuming 2.5lb increase in dumbbell and 5lb increase in pull-up/dip/barbell weekly. 10 or 20lbs monthly.) Dips are equivalent to 225 bench. ~315 RDL is equivalent to 405 Deadlift I think? 225 bench at 160lbs i 1.4x body weight. Weighted pull-up at 85-90 lbs is 1.4x body weight? Lots of benchmarks on strengthlevel.com. Maybe I should follow this. Seems like I'm aiming for intermediate level. \nRound 2: Haircut, Strawberry Skin, Skin-care routine, New Clothes\nRound 3: Dating app profile + photos"
    },
    {
      name: "7 areas of Life: Relationship",
      notes: null
    },
    {
      name: "7 areas of Life: Spiritual",
      notes: null
    },
    {
      name: "Limiting Beliefs",
      notes: null
    },
    {
      name: "Roadblocks",
      notes: null
    },
    {
      name: "Role Model",
      notes: null
    },
    {
      name: "Tips",
      notes: "Note. Another note \nNew line"
    }
  ]

  async function deleteNote () {
    try {
      const response = await fetch(`http://localhost:5050/custom-text-areas/${ textAreaId }`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${ accessToken }`
        }
      });

      const data = await response.json();
      console.log(data);

      setUserNotes(prev => prev.filter(note => note.id !== textAreaId));

      // Unselect note after deletion
      setTitle("");
      setContent("");
      setTextAreaId(null);
      
      setShowDeleteOverlay(false);
      alert("Note deleted!");
    } catch (error) {
      console.error("Error deleting Note", error);
    }
  }

    async function updateNote () {
    try {
      const response = await fetch(`http://localhost:5050/custom-text-areas/${ textAreaId }`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${ accessToken }`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: title,
          notes: content
        })
      });

      const data = await response.json();
      console.log(data);
      setUserNotes(prev => prev.map(note => note.id === textAreaId ? data.customTextArea : note));

      alert("Note Updated!");
    } catch (error) {
      console.error("Erroring updating Note", error);
    }
  }

  useEffect(() => {
    setTextAreas(userNotes || []);
  }, [userNotes])

  return (
    <div className="flex w-full">

      {showDeleteOverlay && 
        <DeleteConfirmation 
          setShowDeleteOverlay={setShowDeleteOverlay} 
          deleteNote={deleteNote} 
          deleteOverlayType={"CustomTextArea"}
        />
      }

      {showOverlay && 
        <NotesOverlay 
          accessToken={ accessToken } 
          showOverlay={ showOverlay } 
          setShowOverlay={ setShowOverlay }
          setUserNotes={ setUserNotes }

          setTitle={ setTitle }
          setContent={ setContent }
          setTextAreaId={ setTextAreaId }
        />
      }

      {/* ----------- Actual Content (Below) ----------- */}

      <div 
        className="fixed h-[calc(100vh-2.5rem)] top-[2.5rem] left-0
        flex flex-col bg-[var(--quarternary-bg)] px-2"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="flex gap-2 p-4 justify-center">
          <button className="px-2 py-1 border text-[0.75rem]" onClick={() => setShowOverlay(true)}>Add Note</button>
        </div>
        {
          textAreas && textAreas.map((textArea, index) => (
            <button key={index} className="text-start px-2 py-[0.1875rem]"
              onClick={() => { 
                setTitle(textArea.name); 
                setContent(textArea.notes || ""); 
                setTextAreaId(textArea.id);
              }}
            >
              <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{textArea.name}</h2>
            </button>
          ))
        }
      </div>

      <div className="fixed h-[calc(100vh-2.5rem)] top-[2.5rem] right-0 flex flex-col"
        style={{ width: `calc(100vw - ${sidebarWidth}px)`, backgroundColor: title ? 'var(--secondary-bg)' : "var(--main-bg)" }}
      >
        {
          title && 
          <>
            <input 
              className="py-4 pl-2 ml-2 mr-4 text-[1.25rem] font-semibold" 
              style={{ outline: 'none', borderBottom: '1px solid var(--border)' }} 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            
            <textarea 
              className="h-full mt-2 ml-4 pr-4"
              style={{ outline: 'none'}} 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <div className="flex gap-2 justify-between p-2">
              <button className="px-2 py-1 border" onClick={() => {
                // console.log(textAreaId);
                // console.log(userNotes);
                setShowDeleteOverlay(true); 
              }}>Delete</button>
              
              <button className="px-2 py-1 border" onClick={() => updateNote()}>Save</button>
            </div>
          </>
        }
        
      </div>
    </div>
  )
}

export default Notes