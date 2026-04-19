import User from "../models/User.js";
import bcrypt from "bcrypt";


export async function register(req, res){
    try{
    const user = req.body;
    const exists = await User.exists({ email: user.email});
    if (exists){
        return res.status(400).json({
            success: false,
            message: "user already exists"
        });
    }
    
    //hashing
    const saltRounds = 10;
    const password = req.body.password;


    const hashVal = await bcrypt.hash(password, saltRounds)
    //comparison: bcrypt.compare(enteredpass, shtored hash (err, result) => {if error thrto err result correct else incorrect})

    user.password = hashVal;
    const user_prof = await User.create(user);
   

    return res.status(201).json({
        success: true,
        message: "lessgo the johsnon is registered"
    });}
    catch (err){
        return res.status(500).json({success: false, message: "Server error ", error: err.message});
    }
}

export async function login(req, res){
    try{
    const user = req.body;
    const user_prof = await User.findOne({ email: user.email});
    if (!user_prof){
        return res.status(401).json({
            success: false,
            message: "user notta found"
        });
    }

    const match = await bcrypt.compare(user.password, user_prof.password);

    if (!match){
        return res.status(401).json({
            success: false,
            message: "passwords do not match"
        })
    }
    return res.status(200).json({
        success: true,
        message: "authenticated!!"
    })}
    catch (err){
        return res.status(500).json({success: false, message: "Server error ", error: err.message});
    }

}

