import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate Refresh Token and Access Token
const generateAccessAndRefreshToken = async (userid) =>{
     try{
        const user = await User.findById(userid);
        const refreshToken =  user.generateRefreshToken();
        const accessToken =  user.generateAccessToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken}
     }
     catch(error){
        throw new apiError('Failed to generate tokens', 500)
     }
}
//Register
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
// Login
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // Validation
    if(!username && !email){
        throw new apiError("All fields are required", 400)
    }
    const existedUser = await User.findOne({ $or: [{ username} , {email}]})
    if(!existedUser){
        throw new apiError("Invalid Username or Email", 404)
    }
    const isPasswordValid = await existedUser.isPasswordCorrect(password)
    // const isMatch = await bcrypt.compare(password, existedUser.password);
    if(!isPasswordValid){
        throw new apiError("Invalid Password", 401)
    }
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(existedUser._id);
     
    const user = await User.findById(existedUser._id).select("-access_token -password")
    const options = {
        httpOnly : true,
        secure:true
    }
     return res
     .status(200)
     .cookie('access_token', accessToken, options)
     .cookie("refresh_token", refreshToken, options)
     .json(new ApiResponse(200, "User logged in successfully", user))
})

// Logout


export { registerUser , loginUser,}