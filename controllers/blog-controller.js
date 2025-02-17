import Blog from "../model/Blog.js";  // ✅ Ensure the `.js` extension is included
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ success: blogs });
}

export const addBlog = async (req, res, next) => {
    const{title,description,image,user}= req.body;
    let existingUser;
    try{
        existingUser =  await User.findById(user);
    }catch (err){
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
      const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        awaitsession.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {
    const {title,description}= req.body;
    const blogId = req.params.id;
    let blog;
    try{
    blog = await Blog.findByIdAndUpdate(blogId,{
        title,description});
    }catch(err){
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Blog Not Updated" });
    }   
    return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
    const { id } = req.params; // Extract blog ID from the request URL
    let blog;

    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching blog", error: err.message });
    }

    if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
    }

    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const { id } = req.params; // Extract blog ID from the request URL
    let blog;

    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);   
        await blog.user.save();
    }
    catch (err) {
       console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ message: "Blog Deleted" });
}


export const getByUserId = async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await Blog.findById(userId).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ success: userBlogs });
}

