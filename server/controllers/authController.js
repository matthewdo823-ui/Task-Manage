import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

    //comparison: bcrypt.compare(enteredpass, shtored hash (err, result) => {if error thrto err result correct else incorrect})

    user.password = await bcrypt.hash(password, saltRounds)
    const user_prof = await User.create(user);

    const jwtkey = jwt.sign({ id: user_prof._id }, process.env.JWT_SECRET, {expiresIn: '1d'});

    return res.status(201).json({
        success: true,
        message: "lessgo the johsnon is registered",
        "token": jwtkey
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

    const jwtkey = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
        success: true,
        message: "authenticated!!",
        "token": jwtkey
    })}
    catch (err){
        return res.status(500).json({success: false, message: "Server error ", error: err.message});
    }

}

