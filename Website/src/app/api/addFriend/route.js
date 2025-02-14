import { NextResponse } from "next/server"
import User from "@/utils/schemas/User"
import { nanoid } from "nanoid"
import Chat from "@/utils/schemas/Chat"

async function handler(req) {
    const data = await req.json()
    const friendCode = data.friendCode
    const myFriendCode = data.myCode
    if(!friendCode || !myFriendCode) {
        return NextResponse.json({ 'error': 'No Friend Code Provided/Your Friend Code Not Provided' })
    }
    let friend = await User.findOne({ friendCode: friendCode })
    let me = await User.findOne({ friendCode: myFriendCode })

    if(!friend || !me) {
        return NextResponse.json({ 'error': 'Invalid Friend Code' })
    }

    me.friends.map((friend) => {
        if(friend.friendCode === friendCode) {
            return NextResponse.json({ 'error': 'Already Friends' })
        }
    })

    const chatID = nanoid(10)
    friend.friends.push({
        friendCode: myFriendCode,
        chatCode: chatID
    })
    me.friends.push({
        friendCode: friendCode,
        chatCode: chatID
    })
    await User.updateOne({ friendCode: myFriendCode }, me)
    await User.updateOne({ friendCode: friendCode }, friend)

    await new Chat({
        chatID: chatID,
        chatLog: [],
        authUsers: [
            {
                username: me.name,
                friendCode: me.friendCode,
            },
            {
                username: friend.name,
                friendCode: friend.friendCode
            }
        ]
    }).save()

    return NextResponse.json({
        chatID: chatID,
        pfp: friend.pfp,
        name: friend.name,
    })
}

export { handler as GET, handler as POST }