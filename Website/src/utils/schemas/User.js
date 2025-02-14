import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    pfp: String,
    friendCode: String,
    friends: [{
        friendCode: String,
        chatCode: String,
    }],
    created: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users')