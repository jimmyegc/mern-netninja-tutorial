import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const [workouts, setWorkouts] = useState([])  

  const fetchWorkouts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/workouts')
      const data = await res.json()
      console.log(data)
      if(res.ok) {
        setWorkouts(data)
      }
    } catch (error) {
      console.log(error)
    } 
  }
  
  useEffect(()=> {
    fetchWorkouts()
  },[])

  return (
    <div className="home">
      <div className="workouts">
        {workouts?.map((workout: any) => (  
          <WorkoutDetails key={workout.id} workout={workout} />        
        ))}
      </div>      
      <WorkoutForm/>
    </div>
  )
}

export default Home
