import users from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => { 

  const { email, password } = req.body;
  const user = await users.findOne({ email });
  if (user) {
    let confirm = await bcrypt.compare(password, user.password);
    if (confirm) {
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name 
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ status: "success", token });
    } else {
      res.json({ success: false, message: "Invalid password" });
    }
  } else {
      res.json({success : false,message:"User not found"});
    }
}



export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await users.findOne({ email });
    if (userExist) {
      res.json({ status: "error", message: "User already exists" });
    } else {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = {
        name,
        email,
        password:hashedPassword
      };
      const newUser = await users.create(data);
      res.json({ status: "success", message: "User created successfully", data: newUser });
    }
  } catch (error) {
    console.error("Error in signup function:", error);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
  
}