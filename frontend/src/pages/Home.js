import { useEffect, useState } from "react";

//component imports
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

const[workouts, setWorkouts] = useState(null)

useEffect(() => {
     const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()

        if (response.ok){
           setWorkouts(json)
        } else {
           console.log("No workout found")
        }

     }

     fetchWorkouts()
}, [])

return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )  
}

export default Home;
