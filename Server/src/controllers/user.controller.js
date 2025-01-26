import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

// Generate Refresh Token and Access Token
const generateAccessAndRefreshToken = async (userid) =>{
     try{
        const user = await User.findById(userid);
        const refreshToken = await user.generateRefreshToken();

        const accessToken = await user.generateAccessToken(); 
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
     .cookie('accessToken', accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(new ApiResponse(200, "User logged in successfully", user))
})

// Logout
const logoutUser = asyncHandler(async (req, res) => {
    // Remove refresh token from user document in database
     await User.findByIdAndUpdate(
        req.user._id,
        { refreshToken: undefined },
        { new: true }
     )
     const options = {
        httpOnly : true,
        secure:true
    }
     return res.status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(new ApiResponse(200, "User logged out successfully"))
})

// RefreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken ;
    // Validation
    if(!incomingRefreshToken){
        throw new apiError("Refresh token is required", 401)
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        if(!decodedToken){
            throw new apiError("Invalid refresh token", 403)
        }
        const user = await User.findById(decodedToken._id)
        if(!user){
            throw new apiError("User not found", 404)
        }
        if(user.refreshToken !== incomingRefreshToken){
            throw new apiError("Refresh token has expired", 401)
        }
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshToken(user._id);
        const options = {
            httpOnly : true,
            secure:true
        }
        return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(new ApiResponse(200, "Access token refreshed successfully"))
     
    } catch (error) {
        throw new apiError(401,"Invalid Refresh Token")
    }
})

// Change Password
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    // Validation
    if(!currentPassword || !newPassword){
        throw new apiError("All fields are required", 400)
    }
    const user = await User.findById(req.user._id)
    const isPasswordValid = await user.isPasswordCorrect(currentPassword)
    if(!isPasswordValid){
        throw new apiError("Invalid current password", 401)
    }
    user.password = newPassword;
    await user.save({validateBeforeSave: false});
    return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"))
})

// Get User Profile
const getUserProfile = asyncHandler(async (req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,"User profile",req.user))
})

// Update User Account
const updateUserAccount = asyncHandler(async (req,res)=>{
     const {fullName,email}= req.body
     // Validation
     if(!fullName || !email){
         throw new apiError('All fields are required', 400)
     }    
     const updatedUser = await User.findByIdAndUpdate(
         req.user?._id,
         { 
            $set : { fullName , email }
         },
         { new: true }
     ).select("-password")

     return res
     .status(200)
     .json(new ApiResponse(200,"User Account updated successfully",updatedUser))
})

// Update User Avatar
 const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new apiError("Avatar is required", 400)
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new apiError("Failed to upload avatar", 500)
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set:{ avatar }},
        { new: true }
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200,"User Avatar updated successfully",updatedUser))
 })
// Update User CoverImage
 const updateUserCoverImage = asyncHandler(async(req,res)=>{
    const coverImageLocalPath = req.file?.path
    if(!coverImageLocalPath){
        throw new apiError("CoverImage is required", 400)
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!coverImage){
        throw new apiError("Failed to upload CoverImage", 500)
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set:{ coverImage }},
        { new: true }
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200,"User CoverImage updated successfully",updatedUser))
 })
export {
    registerUser, 
    loginUser, 
    logoutUser , 
    refreshAccessToken,
    changePassword,
    getUserProfile,
    updateUserAccount,
    updateUserAvatar,
    updateUserCoverImage,
 
}