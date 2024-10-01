import BlogModel from "../model/BlogModel.js";

export const createBlog = async (req, res) => {
  const { title, description, content } = req.body;
  try {
    const newBlog = new BlogModel({
      title,
      description,
      content,
      author: req.user.id,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    await newBlog.save();
    res.json({ status: "success", message: "Blog created successfully", data: newBlog });
  } catch (error) {
    console.error("Error in createBlog function:", error);
    res.status(500).json({ error: "An error occurred while creating the blog" });
  }
}



export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.json({ status: "success", message: "Blogs fetched successfully", data: blogs });
  } catch (error) {
    console.error("Error in getAllBlogs function:", error);
    res.status(500).json({ error: "An error occurred while fetching the blogs" });
  }
}

export const getOne = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    res.json({ status: "success", message: "Blog fetched successfully", data: blog });
  } catch (error) {
    console.error("Error in getOne function:", error);
    res.status(500).json({ error: "An error occurred while fetching the blog" });
  }
}







