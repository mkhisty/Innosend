import mongoose from "mongoose";

let ChatSchema = new mongoose.Schema({
    chatID: String,
    chatLog: [{
        t: String,
        sender: String,
        message: String,
        sent: String
    }],
    authUsers: [{
        username: String,
        friendCode: String,
    }]
})

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema, 'chats')