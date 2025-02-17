import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    blogs:[{
      type: mongoose.Types.ObjectId,
      ref:"Blog",
      required: [true]
    }]
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
