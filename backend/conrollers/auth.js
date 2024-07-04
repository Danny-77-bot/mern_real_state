import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in signup process"
        });
    }
};

export const signin=async(req,res,next)=>{
const {email,password}=req.body;
try {
  const validUser=await User.findOne({email});
  if(!validUser) {
    return next(errorHandler(404,"user not found"));
  } 
  const validPassword=bcrypt.compareSync(password,validUser.password);
  if(!validPassword) return next(errorHandler(401,'wrong credential'));
  const token=jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
  const {password:pass,...rest}=validUser._doc;
  res.cookie('access_token',token,
    {httpOnly:true}).status(200).json(rest)
} catch (error) {
  next(error);
}
}
