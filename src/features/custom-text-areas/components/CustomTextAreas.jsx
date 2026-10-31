import { useEffect, useState } from "react"
import CustomTextArea from "./CustomTextArea"
import CustomTextAreaOverlay from "./CustomTextAreaOverlay";
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const CustomTextAreas = (props) => {
  const accessToken = props.accessToken;
  const userCustomTextAreas = props.userCustomTextAreas;
  const setUserCustomTextAreas = props.setUserCustomTextAreas;

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

  async function deleteCustomTextArea () {
    try {
      const response = await fetch(`http://localhost:5050/custom-text-areas/${ textAreaId }`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${ accessToken }`
        }
      });

      const data = await response.json();
      console.log(data);

      setUserCustomTextAreas(prev => prev.filter(customTextArea => customTextArea.id !== textAreaId));
      setShowDeleteOverlay(false);
      alert("Custom Text Area deleted!");
    } catch (error) {
      console.error("Erroring deleting Custom Text Area", error);
    }
  }

  useEffect(() => {
    setTextAreas(userCustomTextAreas || []);
  }, [userCustomTextAreas])

  return (
    <div className="flex flex-col gap-4">

      {showDeleteOverlay && <DeleteConfirmation deleteCustomTextArea={deleteCustomTextArea} deleteOverlayType={"CustomTextArea"}/>}

      {showOverlay && 
        <CustomTextAreaOverlay 
          accessToken={ accessToken } 
          showOverlay={ showOverlay } 
          setShowOverlay={ setShowOverlay }
          setUserCustomTextAreas={ setUserCustomTextAreas }
        />
      }

      <h1 className="text-[1.25rem] font-semibold">CustomTextAreas</h1>

      <div className="flex gap-4 flex-wrap items-center justify-center">
        { textAreas && 
          textAreas.map((textArea, index) => {
            return(
              <CustomTextArea 
                accessToken={ accessToken }
                setUserCustomTextAreas={ setUserCustomTextAreas }
                index={ index } 

                textArea={textArea}
                textAreaId={textAreaId}
                setTextAreaId={setTextAreaId}

                setShowDeleteOverlay={setShowDeleteOverlay}
              />
            )
          })
        }
        {
          textAreas.length === 0 && <p>There's nothing here... Create a new Custom Text Area to get started!</p>
        }
      </div>

      <div className="flex gap-4 p-2">
        <button className="border px-2 py-1" onClick={() => setShowOverlay(true) } type="button">Create New Text Area</button>
      </div>
    </div>
  )
}

export default CustomTextAreas