import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      
      // Kiểm tra xem user có phải admin không
      if (user.role !== "admin") {
        return res.json({ success: false, message: "Access denied" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
      
      const token = createToken(user._id);
      return res.json({ success: true, token, message: "Login successful" });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Server error" });
    }
  };
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  };

export {loginAdmin}