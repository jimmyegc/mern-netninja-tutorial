import { formatDistanceToNow } from "date-fns"

const WorkoutDetails = ({ workout }) => {
  console.log(workout)
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()
    if(response.ok) {
      alert('Workout deleted')
    } else {
      alert('Error deleting workout')
    }    
  }

  return (
    <div className='workout-details'>
      
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  )
}

export default WorkoutDetails
