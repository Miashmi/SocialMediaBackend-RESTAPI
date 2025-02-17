import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User exists already, please login instead." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({ name, email, password: hashedPassword, blogs:[]});
    await user.save();

    return res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.error("Error in signup:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  console.log("Login attempt:", req.body);

  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ message: "Incorrect Password" });
    }

    console.log("Login successful");
    return res.status(200).json({ message: "Logged In!" });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
