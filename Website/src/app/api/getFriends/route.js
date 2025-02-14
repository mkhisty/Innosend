import { NextResponse } from "next/server";
import User from "@/utils/schemas/User";

async function handler(req) {
    const friendCode = (await req.json()).friendCode
    if(!friendCode) {
        return NextResponse.json({ 'error': 'No Friend Code Provided' })
    }
    const user = await User.findOne({ friendCode: friendCode })
    if(!user) {
        return NextResponse.json({ 'error': 'Invalid Friend Code' })
    }
    let friendData = []
    for(const friend of user.friends) {
        const fCode = friend.friendCode
        const fData = await User.findOne({ friendCode: fCode })
        const chatCode = fData.friends.filter((f) => f.friendCode === friendCode)[0].chatCode
        friendData.push({
            pfp: fData.pfp,
            name: fData.name,
            chatID: chatCode
        })
    }

    return NextResponse.json({ 'friendData': friendData })
}

export { handler as GET, handler as POST }