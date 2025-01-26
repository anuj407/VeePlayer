import  jwt  from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



export const verifyJwt = asyncHandler(async (req,res,next)=>{    
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
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