import jwt from "jsonwebtoken"
import User from "../models/User"


//verifies and decodes jwt --> attatches it to req.user obj
export async function auth(req, res){
    const authHeader = req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    if (!token){
        return res.status(401).json({
            success: false,
            message: "No token, unauthorized"
        })
    }

    try{
    jwt.verify(token, process.env.JWT_SECRET);}
    catch (err){
        return res.status(401).json({
            success: false,
            message: "verification error",
            error: err.message
        })
    }

    const idPayload = jwt.decode(token);
    const user = await User.findById(idPayload._id);
    
    if (!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    req.user = user
    next();
}