import { useWorkoutConext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({workout}) => {
 const { dispatch } = useWorkoutConext()

  const handleClick = async () =>{
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
   })
   const json = await response.json()

   if(response.ok) {
     dispatch({type:'DELETE_WORKOUT', payload:json})
   }
  }

  return(
    <div className='workout-details-container'>
       <h3> {workout.title} </h3>
       <p><strong>Weight(kg): </strong>{workout.weight}</p>
       <p><strong>Reps(kg): </strong>{workout.reps}</p>
       <p><strong>Date: </strong>{new Date(workout.createdAt).toISOString().split('T')[0]}</p>
       <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )  

}

export default WorkoutDetails;