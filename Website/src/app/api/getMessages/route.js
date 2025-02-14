import Chat from "@/utils/schemas/Chat";
import User from "@/utils/schemas/User";
import { NextResponse } from "next/server";

async function handler(req) {
    const data = await req.json()
    const chatID = data['chatID']

    if(!chatID) {
        return NextResponse.json({ 'error': 'Insufficient Data' })
    }

    let chat = await Chat.findOne({ chatID: chatID })
    if(!chat) {
        return NextResponse.json({ 'error': 'Invalid Chat ID' })
    }

    const authUsers = chat.authUsers
    let users = []
    for(const userData of authUsers) {
        const friendCode = userData.friendCode
        const user = await User.findOne({ friendCode: friendCode })
        users.push(user)
    }

    return NextResponse.json({ 'data': chat, 'users': users })
}

export { handler as GET, handler as POST }