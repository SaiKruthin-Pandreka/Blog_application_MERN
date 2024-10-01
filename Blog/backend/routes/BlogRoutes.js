import express from "express";
import { createBlog, getAllBlogs, getOne } from "../controller/BlogController.js";
import { verifyToken } from "../middleware/auth.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const blog_router = express.Router();

blog_router.post("/create-blog",upload.single('image'),verifyToken,  createBlog);
blog_router.get("/one-blog/:id",  getOne);

blog_router.get("/all-blogs", getAllBlogs);

export default blog_router;