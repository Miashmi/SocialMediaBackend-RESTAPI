import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js"; // ✅ Add `.js`


const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect("mongodb+srv://admin:IwW0PR5DcVQjyrPs@cluster0.lkjlo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => app.listen(5000))
    .then(() => 
      console.log("Connected to Database and Listening on port 5000 🚀")
  )
  .catch((err) => console.error(err));
 