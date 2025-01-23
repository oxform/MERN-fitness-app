const WorkoutDetails = ({workout}) => {

  return(
    <div className='workout-details-container'>
       <h3> {workout.title} </h3>
       <p><strong>Weight(kg): </strong>{workout.weight}</p>
       <p><strong>Reps(kg): </strong>{workout.reps}</p>
       <p><strong>Date: </strong>{new Date(workout.createdAt).toISOString().split('T')[0]}</p>

    </div>
  )  

}

export default WorkoutDetails;