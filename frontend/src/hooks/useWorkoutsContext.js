import { WorkoutsContext } from "../context/WorkoutsContexts";
import { useContext } from "react";

export const useWorkoutConext = () => {
    const context = useContext(WorkoutsContext)

    if(!context) {
        throw Error('useWorkoutsContext not found')
    }
    return context
}