import { useState } from "react";
import { useWorkoutConext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutConext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [weight, setWeight] = useState(workout.weight);
  const [reps, setReps] = useState(workout.reps);
  const [category, setCategory] = useState(workout.category);

  const handleEdit = async () => {
    const updatedWorkout = { title, weight, reps,category };

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Legs">Legs</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Arms">Arms</option>
            <option value="Core">Core</option>
          </select>  
         
          <button className="saveBtn" onClick={handleEdit}>Save</button>
          <button className="cancelBtn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{workout.title}</h3>
          <p><strong>Weight(kg): </strong>{workout.weight}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p><strong>Category: </strong>{workout.category}</p>
          <p><strong>Date: </strong>{new Date(workout.createdAt).toISOString().split('T')[0]}</p>
        
          <div className="button-container">
            <button className="editBtn" onClick={() => setIsEditing(true)}>Edit</button>
            <span className="material-symbols-outlined delete-icon" onClick={handleClick}>delete</span>
          </div>
        </>
      )}
    </div>
  );
  
  
};

export default WorkoutDetails;
