import Chat from "@/utils/schemas/Chat";
import { NextResponse } from "next/server";

async function handler(req) {
    const data = await req.json()
    const message = data['message']
    const sender = data['sender']
    const chatID = data['chatID']

    if(!message || !sender || !chatID) {
        return NextResponse.json({ 'error': 'Insufficient Data' })
    }

    let chat = await Chat.findOne({ chatID: chatID })
    if(!chat) {
        return NextResponse.json({ 'error': 'Invalid Chat ID' })
    }

    const val = {
        t: "text",
        message: message, 
        sender: sender,
        sent: new Date().toUTCString()
    }

    chat.chatLog.push(val)

    await Chat.updateOne({ chatID: chatID }, chat)
    return NextResponse.json({ 'data': val })
}

export { handler as GET, handler as POST }