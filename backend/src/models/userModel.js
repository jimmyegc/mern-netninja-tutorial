import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true 
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
  // validation
  if(!email || !password) throw new Error('Email and password are required')  
  if(!validator.isEmail(email)) throw new Error('Email is not valid')
  if(!validator.isStrongPassword(password)) throw new Error('Password is not strong enough')

  const exists = await this.findOne({ email })
  if (exists) throw new Error('User with this email already exists')

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })  
  return user
}

userSchema.statics.signin = async function(email, password) {
  // validation
  if(!email || !password) throw new Error('Email and password are required')  
  if(!validator.isEmail(email)) throw new Error('Email is not valid')

  const user = await this.findOne({ email })
  if (!user) throw new Error('User not found')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid credentials')

  return user
}

export const User = mongoose.model('User', userSchema) 