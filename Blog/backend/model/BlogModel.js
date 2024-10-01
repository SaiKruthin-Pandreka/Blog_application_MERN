import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require:true
  },
  description: {
    type: String,
    require:true
  },
  content: {
    type: String,
    require:true
  },
  image: {
    type: String,
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require:true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('blogs',blogSchema)