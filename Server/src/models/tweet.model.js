import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    } 
})

export const Tweet = mongoose.model("Tweet", tweetSchema);