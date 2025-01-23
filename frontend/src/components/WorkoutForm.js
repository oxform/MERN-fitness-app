
import { useState } from "react"

const WorkoutForm = () => {
    const[title, setTitle] = useState('');
    const[weight, setWeight] = useState('');
    const[reps, setReps] = useState('');
    const[error, setError] = useState(null);

    const handleSubmit = async (e) => {
         e.preventDefault()

         const workout = {title,weight,reps}
         const response = await fetch('/api/workouts',{
            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
         })
         const json = await response.json()

         if(!response.ok){
            setError(json.error)
         } else {
            setTitle('')
            setWeight('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
         }
    }

return (
  <form className="create-workout-container" onSubmit={handleSubmit}>
        <h3> Add a new Workout </h3>

        <label> Exercise Title: </label>
        <input
        type="text"
        onChange={(e)=> setTitle(e.target.value)}   
        value={title}    
        />

        <label> Weight(KG): </label>
        <input
        type="number"
        onChange={(e)=> setWeight(e.target.value)}
        value={weight}    
        
        />

        <label> Reps: </label>
        <input
        type="number"
        onChange={(e)=> setReps(e.target.value)}  
        value={reps}    

        />

        <button> Save Exercise </button>
        {error && <div className="error-container">{error}</div>}

  </form>
)

}

export default WorkoutForm