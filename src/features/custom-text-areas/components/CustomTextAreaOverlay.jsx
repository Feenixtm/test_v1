import { useState, useEffect } from "react";

const CustomTextAreaOverlay = (props) => {
  const accessToken = props.accessToken;
  const setUserCustomTextAreas = props.setUserCustomTextAreas;

  const setShowOverlay = props.setShowOverlay;

  const [name, setName] = useState("");
  
  async function createCustomTextArea () {
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
      setUserCustomTextAreas(prev => [...prev, data.customTextArea ]);
      setName("");
      setShowOverlay(false);

      alert("Custom Text Area Created!");
    } catch (error) {
      console.error("Erroring creating Custom Text Area", error);
    }
  }
  
  return (
    <div 
      className="fixed top-0 left-0 w-[100vw] h-full flex justify-center items-center dark-transparent-bg z-20"
      onClick={() => { setShowOverlay(false); }}
    >

      <form
        className="flex flex-col gap-2 p-4 rounded bg-blue-700 min-w-[375px] w-full max-w-[475px]"
        onClick={(e) => e.stopPropagation()}
      >
        <label>Name</label>
        <input 
          className="border px-2 py-1" 
          placeholder="E.g. My Goals for 2026"
          value={ name }
          onChange={(e) => setName(e.target.value)}
        ></input>
        
        <div className="flex justify-end">
          <button className="px-2 py-1 border" onClick={() => createCustomTextArea()} type="button">Create</button>
        </div>
      </form>

    </div>
  )
}

export default CustomTextAreaOverlay