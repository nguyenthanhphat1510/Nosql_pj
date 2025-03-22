import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userList = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body
  
  try{
      const user = await userModel.findOne({email})
      if(!user) {
          return res.json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
          return res.json({ success: false, message: "Invalid credentials" });
      }

      const token = createToken(user._id);
      return res.json({ success: true, token, message: "Login successfull",user  });
  } catch(err) {
      console.log(err);
      return res.json({ success: false, message: "Server error" });
  }
};

const createToken = (id) => {
  return jwt.sign({_id: id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check user already registered
    const exits = await userModel.findOne({ email });
    if (exits) {
      return res.json({ success: false, message: "User already registered" });
    }
    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("Saved user:", user);
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error" });
  }
};

export { registerUser, loginUser, userList };
