import { useState } from "react"

const WorkoutForm = () => {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]) 

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(title, load, reps)
    const workout = { title, load, reps}
    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    })  
    const json = await response.json()
    if(!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(response.ok) {
      console.log('new Workout added')
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Add New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Excersize Title:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button type="submit">Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>

  )
}

export default WorkoutForm

