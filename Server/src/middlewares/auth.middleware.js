import  jwt  from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



export const verifyJwt = asyncHandler(async (req,res,next)=>{    
    try{
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split("Bearer ")[1];
        if(!token){
            throw new apiError("Unauthorized Request",401)
        }
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
        if(!user){
            throw new apiError("Invalid Access Token",401)
        }
        req.user = user;
        next()
    }catch(err){
        throw new apiError(err.message,401)
    }
})

export const verifyOptionalJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split("Bearer ")[1];

    if (!token) {
        // No token → proceed without authentication
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if (user) {
            req.user = user;  // Attach authenticated user
        } else {
            req.user = null;  // Invalid token → proceed without user
        }
        
    } catch (error) {
        req.user = null;  // Invalid token → proceed without authentication
    }

    next();
});

export const checkToken = asyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split("Bearer ")[1];
    if(token){
        next();
    }
    else{
        return
    }
})