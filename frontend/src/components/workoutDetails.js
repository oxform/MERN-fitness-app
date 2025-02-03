import { useState } from "react";
import { useWorkoutConext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutConext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [weight, setWeight] = useState(workout.weight);
  const [reps, setReps] = useState(workout.reps);

  const handleEdit = async () => {
    const updatedWorkout = { title, weight, reps };

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWorkout),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setIsEditing(false); // Exit edit mode
    }
  };

  const handleClick = async () =>{
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
   })
   const json = await response.json()

   if(response.ok) {
     dispatch({type:'DELETE_WORKOUT', payload:json})
   }
  }



  return (
    <div className="workout-details-container">
      {isEditing ? (
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
          <button className="saveBtn" onClick={handleEdit}>Save</button>
          <button className="cancelBtn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{workout.title}</h3>
          <p><strong>Weight(kg): </strong>{workout.weight}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p><strong>Date: </strong>{new Date(workout.createdAt).toISOString().split('T')[0]}</p>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
          <button className="saveBtn" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
