import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  }
})


export default mongoose.model('users',userSchema)