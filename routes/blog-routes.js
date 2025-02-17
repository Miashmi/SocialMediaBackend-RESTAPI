import express from "express";
import { deleteBlog, getBlogById, updateBlog, addBlog, getAllBlogs, getByUserId } from "../controllers/blog-controller.js"; // ✅ Fixed duplicate import

const blogRouter = express.Router(); 

blogRouter.get("/", getAllBlogs); 
blogRouter.post("/add", addBlog); 
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById); 
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get('/user/:id',getByUserId)

export default blogRouter;
