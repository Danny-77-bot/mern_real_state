import User from "../models/user.js";
import bcrpt from 'bcrypt'
export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassord=bcrpt.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassord});
    try {
        await newUser.save();

        res.status(201).json('user created successfully');   
    } catch (error) {
        next(error);
    }
}