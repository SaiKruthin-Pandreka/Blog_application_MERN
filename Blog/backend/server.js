import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/UserRoutes.js"
import blog_router from "./routes/BlogRoutes.js";


import multer from 'multer';
import path from 'path';

dotenv.config()  

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));


app.use(express.json())  
app.use("/api", router)
app.use("/api", blog_router)

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;  

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error connecting to DB:", error));