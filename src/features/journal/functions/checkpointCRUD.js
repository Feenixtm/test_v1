async function createCheckpoint(accessToken, frequency, checkpointDate, notes) {
  try {
    const response = await fetch("http://localhost:5050/checkpoints", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        frequency: frequency,
        checkpointDate: checkpointDate,
        notes: notes
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${frequency} goal`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error(`Error creating ${frequency} goal:`, error);
  }
}

async function updateCheckpoint(accessToken, checkpointId, frequency, notes) {
  try {
    const response = await fetch(`http://localhost:5050/checkpoints/${checkpointId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notes: notes
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${frequency} goal`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error(`Error updating ${frequency} goal:`, error);
  }
}

async function deleteCheckpoint(accessToken, checkpointId, frequency) {

  try {
    // console.log("Deleting checkpoint...");
    const response = await fetch(`http://localhost:5050/checkpoints/${checkpointId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${frequency} goal`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(`Error deleting ${frequency} goal:`, error);
  }
}

export { createCheckpoint, updateCheckpoint, deleteCheckpoint };