import { Workout } from '../models/workoutModel.js'
import mongoose from 'mongoose'

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }) // newest first
    res.status(200).json(workouts)  
  } catch(error){
    return res.status(500).json({ message: error.message })
  }
}

export const getWorkout = async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid workout id' })
  } 
  try {
    const workout = await Workout.findById(id)
    res.status(200).json(workout)  
  } catch(error){
    return res.status(500).json({ error: error.message })
  }
}

// Create
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body
  let emptyFields = []
  if (!title) emptyFields.push('title')
  if (!load) emptyFields.push('load')
  if (!reps) emptyFields.push('reps')
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)  
  } catch(error){
    return res.status(500).json({ error: error.message })
  }
}

export const updateWorkout = async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid workout id' })
  } 
  const { title, load, reps } = req.body
  if (!title || !load || !reps) {
    return res.status(400).json({ message: 'Title, load and reps are required' })
  }
  try {
    const workout = await Workout.findByIdAndUpdate(id, { title, load, reps }, { new: true })
    res.status(200).json(workout)  
  } catch(error){
    return res.status(500).json({ error: error.message })
  }
}

export const deleteWorkout = async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid workout id' })
  } 
  try {
    await Workout.findByIdAndDelete(id)
    res.status(200).json({ message: 'Workout deleted' })  
  } catch(error){
    return res.status(500).json({ error: error.message })
  }
}

