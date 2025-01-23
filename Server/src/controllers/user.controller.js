import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,username,password} = req.body;
    // Validation
    if([fullName,email,username,password].some((field)=> field?.trim() === ''))
    {
         throw new apiError('All fields are required', 400)
    }
    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })
    if(existedUser){
        throw new apiError('User already exists', 409)
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;    
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files?.coverImage[0]?.path ;
    }
    
    if(!avatarLocalPath){
        throw new apiError("Avatar is required", 400)
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError("Failed to upload avatar", 500)
    }
    // Create new user
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar,
        coverImage: coverImage || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser) throw new apiError("Something went wrong when registering the user", 500);
    
    return res.status(201).json(
        new ApiResponse(200,"User created successfully",createdUser)
    )
    
})

export { registerUser }