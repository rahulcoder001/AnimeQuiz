import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: String,
    email: String,
    password: String,
    avatar: String,
    questionlist: [{
        Anime: String,
        questionid:[Number]
    }],
    membershiplist : [{
        Anime: String,
        count:Number,
    }],
});

const MembershipSchema = new mongoose.Schema({
    user : String,
    Anime:String,
    TransactionId: String,
    Status:String,
    comment: String,
})


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const membershiplist = mongoose.models.Membershiplist || mongoose.model("Membershiplist", MembershipSchema);
