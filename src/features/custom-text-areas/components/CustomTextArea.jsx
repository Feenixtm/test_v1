import { useState, useEffect } from "react";

const CustomTextArea = (props) => {
  const accessToken = props.accessToken;
  const setUserCustomTextAreas = props.setUserCustomTextAreas;
  const index = props.index;

  const textArea = props.textArea;
  const textAreaId = props.textAreaId;
  const setTextAreaId = props.setTextAreaId;
  
  const setShowDeleteOverlay = props.setShowDeleteOverlay;

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  async function updateCustomTextArea () {
    try {
      const response = await fetch(`http://localhost:5050/custom-text-areas/${ textArea.id }`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${ accessToken }`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          notes
        })
      });

      const data = await response.json();
      console.log(data);
      // setUserCustomTextAreas(prev => [...prev.filter(customTextArea => customTextArea.id !== textAreaId), data.customTextArea]);
      setUserCustomTextAreas(prev => prev.map(customTextArea => customTextArea.id === textArea.id ? data.customTextArea : customTextArea));

      alert("Custom Text Area Updated!");
    } catch (error) {
      console.error("Erroring updating Custom Text Area", error);
    }
  }

  useEffect(() => {
    setName(textArea.name || "TEXT_AREA_NAME");
    setNotes(textArea.notes || "");
  }, [textArea])

  return (
    <div key={ index } className="flex flex-col gap-2 max-w-[475px] p-4 bg-[var(--black-33)] rounded">
      <input className="px-1 py-1 border" type="name" value={ name } onChange={ (e) => setName(e.target.value) }></input>
      <textarea className="border p-2" rows={6} cols={60} value={notes} onChange={(e) => setNotes(e.target.value)}/>
      <div className="flex justify-between">
        <button className="px-2 py-1 border text-[red]" 
          onClick={() => {
            // console.log("Deleting functionality disabled until Delete Confirmation added...");
            setTextAreaId(textArea.id)
            setShowDeleteOverlay(true);
          }}
          type="button"
        >Delete</button>
        <button className="px-2 py-1 border text-[#3b82f6]" onClick={() => updateCustomTextArea()} type="button">Save</button>
      </div>
    </div>
  )
}

export default CustomTextArea;